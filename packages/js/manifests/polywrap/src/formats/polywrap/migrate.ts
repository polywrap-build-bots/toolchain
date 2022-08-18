/* eslint-disable */
/**
 * This file was automatically generated by scripts/manifest/migrate-ts.mustache.
 * DO NOT MODIFY IT BY HAND. Instead, modify scripts/manifest/migrate-ts.mustache,
 * and run node ./scripts/manifest/generateFormatTypes.js to regenerate this file.
 */
import {
  AnyPolywrapManifest,
  PolywrapManifest,
  PolywrapManifestFormats,
  latestPolywrapManifestFormat
} from ".";

import {
  migrate as migrate_0_1_to_0_3_0
} from "./migrators/0.1_to_0.3.0";

type Migrator = {
  [key in PolywrapManifestFormats]?: (m: AnyPolywrapManifest) => PolywrapManifest;
};

export const migrators: Migrator = {
  "0.1": migrate_0_1_to_0_3_0,
};

export function migratePolywrapManifest(
  manifest: AnyPolywrapManifest,
  to: PolywrapManifestFormats
): PolywrapManifest {
  let from = manifest.format as PolywrapManifestFormats;

  // HACK: Patch fix for backwards compatability
  if(from === "0.1.0" && ("0.1" in migrators)) {
    from = "0.1" as PolywrapManifestFormats;
  }

  if (from === latestPolywrapManifestFormat) {
    return manifest as PolywrapManifest;
  }

  if (!(Object.values(PolywrapManifestFormats).some(x => x === from))) {
    throw new Error(`Unrecognized PolywrapManifestFormat "${manifest.format}"`);
  }

  const migrator = migrators[from];
  if (!migrator) {
    throw new Error(
      `Migrator from PolywrapManifestFormat "${from}" to "${to}" is not available`
    );
  }

  return migrator(manifest);
}
