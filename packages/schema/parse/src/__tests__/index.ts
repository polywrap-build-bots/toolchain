import { WrapAbi } from "../abi";
import {
  readFileIfExists,
  readNamedExportIfExists
} from "./utils";

import path from "path";
import { readdirSync, Dirent } from "fs";
import { GetPathToParseTestFiles } from "@polywrap/test-cases"

const root = GetPathToParseTestFiles();

export type TestCase = {
  name: string;
  input: string;
  output: WrapAbi;
};

export type TestCases = {
  promise: Promise<TestCase | undefined>;
  name: string;
}[];

export function fetchTestCases(): TestCases {
  const testCases: TestCases = [];

  readdirSync(root, { withFileTypes: true }).forEach(
    (dirent: Dirent) => {
      buildTestCases(
        path.join(root, dirent.name),
        dirent.name,
        testCases
      );
    }
  );

  return testCases;
}

function buildTestCases(
  directory: string,
  name: string,
  testCases: TestCases
): void {
  const items = readdirSync(directory, { withFileTypes: true });

  if (
    items.some(x => x.name.startsWith("input")) &&
    items.some(x => x.name.startsWith("output"))
  ) {
    testCases.push({
      promise: importCase(directory, name),
      name: name
    });
  } else {
    for (const item of items) {
      buildTestCases(
        path.join(directory, item.name),
        item.name,
        testCases
      );
    }
  }
}

async function importCase(
  directory: string,
  name: string,
): Promise<TestCase | undefined> {
  // Fetch the input schema
  const input = readFileIfExists(path.join(directory, "input.graphql"));

  // Fetch the output Abi
  const output = await readNamedExportIfExists<WrapAbi>("abi", path.join(directory, "output.ts"));

  if (!input) {
    console.error(`Missing input file "input.graphql" for test case "${name}" at ${directory}`);
    return undefined;
  }

  if (!output) {
    console.error(`Missing output file "output.ts" for test case "${name}" at ${directory}`);
    return undefined;
  }

  return {
    name,
    input,
    output
  };
}
