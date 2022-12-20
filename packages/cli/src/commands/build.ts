import { Command, Program, BaseCommandOptions } from "./types";
import { createLogger } from "./utils/createLogger";
import {
  Compiler,
  PolywrapProject,
  SchemaComposer,
  Watcher,
  WatchEvent,
  watchEventName,
  intlMsg,
  defaultPolywrapManifest,
  parseDirOption,
  parseClientConfigOption,
  parseManifestFileOption,
  parseLogFileOption,
  parseWrapperEnvsOption,
} from "../lib";
import { CodeGenerator } from "../lib/codegen";
import {
  DockerVMBuildStrategy,
  BuildStrategy,
  SupportedStrategies,
  DockerImageBuildStrategy,
  LocalBuildStrategy,
} from "../lib/build-strategies";

import path from "path";
import readline from "readline";
import { Env, PolywrapClient } from "@polywrap/client-js";
import { PolywrapManifest } from "@polywrap/polywrap-manifest-types-js";
import { Uri } from "@polywrap/core-js";

const defaultOutputDir = "./build";
const defaultStrategy = SupportedStrategies.VM;
const strategyStr = Object.values(SupportedStrategies).join(" | ");
const defaultManifestStr = defaultPolywrapManifest.join(" | ");
const pathStr = intlMsg.commands_build_options_o_path();

export interface BuildCommandOptions extends BaseCommandOptions {
  manifestFile: string;
  outputDir: string;
  clientConfig: string | false;
  wrapperEnvs: string | false;
  noCodegen: boolean;
  watch: boolean;
  strategy: `${SupportedStrategies}`;
}

export const build: Command = {
  setup: (program: Program) => {
    program
      .command("build")
      .alias("b")
      .description(intlMsg.commands_build_description())
      .option(
        `-m, --manifest-file <${pathStr}>`,
        intlMsg.commands_build_options_m({
          default: defaultManifestStr,
        })
      )
      .option(
        `-o, --output-dir <${pathStr}>`,
        `${intlMsg.commands_build_options_o({
          default: defaultOutputDir,
        })}`
      )
      .option(
        `-c, --client-config <${intlMsg.commands_common_options_configPath()}>`,
        `${intlMsg.commands_common_options_config()}`
      )
      .option(
        `--wrapper-envs <${intlMsg.commands_common_options_wrapperEnvsPath()}>`,
        `${intlMsg.commands_common_options_wrapperEnvs()}`
      )
      .option(`-n, --no-codegen`, `${intlMsg.commands_build_options_n()}`)
      .option(
        `-s, --strategy <${strategyStr}>`,
        `${intlMsg.commands_build_options_s({
          default: defaultStrategy,
        })}`
      )
      .option(`-w, --watch`, `${intlMsg.commands_build_options_w()}`)
      .option("-v, --verbose", intlMsg.commands_common_options_verbose())
      .option("-q, --quiet", intlMsg.commands_common_options_quiet())
      .option(
        `-l, --log-file [${pathStr}]`,
        `${intlMsg.commands_build_options_l()}`
      )
      .action(async (options: Partial<BuildCommandOptions>) => {
        await run({
          manifestFile: parseManifestFileOption(
            options.manifestFile,
            defaultPolywrapManifest
          ),
          clientConfig: options.clientConfig || false,
          wrapperEnvs: options.wrapperEnvs || false,
          outputDir: parseDirOption(options.outputDir, defaultOutputDir),
          noCodegen: !options.codegen || false,
          strategy: options.strategy || defaultStrategy,
          watch: options.watch || false,
          verbose: options.verbose || false,
          quiet: options.quiet || false,
          logFile: parseLogFileOption(options.logFile),
        });
      });
  },
};

async function validateManifestModules(polywrapManifest: PolywrapManifest) {
  if (
    polywrapManifest.project.type !== "interface" &&
    !polywrapManifest.source.module
  ) {
    const missingModuleMessage = intlMsg.lib_compiler_missingModule();
    throw Error(missingModuleMessage);
  }

  if (
    polywrapManifest.project.type === "interface" &&
    polywrapManifest.source.module
  ) {
    const noInterfaceModule = intlMsg.lib_compiler_noInterfaceModule();
    throw Error(noInterfaceModule);
  }
}

function createBuildStrategy(
  strategy: BuildCommandOptions["strategy"],
  outputDir: string,
  project: PolywrapProject
): BuildStrategy {
  switch (strategy) {
    case SupportedStrategies.LOCAL:
      return new LocalBuildStrategy({ outputDir, project });
    case SupportedStrategies.IMAGE:
      return new DockerImageBuildStrategy({ outputDir, project });
    case SupportedStrategies.VM:
      return new DockerVMBuildStrategy({ outputDir, project });
    default:
      throw Error(`Unknown strategy: ${strategy}`);
  }
}

async function run(options: Required<BuildCommandOptions>) {
  const {
    watch,
    manifestFile,
    clientConfig,
    wrapperEnvs,
    outputDir,
    strategy,
    noCodegen,
    verbose,
    quiet,
    logFile,
  } = options;
  const logger = createLogger({ verbose, quiet, logFile });

  const envs = await parseWrapperEnvsOption(wrapperEnvs);
  const configBuilder = await parseClientConfigOption(clientConfig);

  if (envs) {
    configBuilder.addEnvs(envs as Env<Uri>[]);
  }

  // Get Client
  const client = new PolywrapClient(configBuilder.buildCoreConfig(), {
    noDefaults: true,
  });

  const project = new PolywrapProject({
    rootDir: path.dirname(manifestFile),
    polywrapManifestPath: manifestFile,
    logger,
  });
  await project.validate();

  const polywrapManifest = await project.getManifest();
  await validateManifestModules(polywrapManifest);

  const buildStrategy = createBuildStrategy(strategy, outputDir, project);

  const schemaComposer = new SchemaComposer({
    project,
    client,
  });

  const execute = async (): Promise<boolean> => {
    const codeGenerator = noCodegen
      ? undefined
      : new CodeGenerator({ project, schemaComposer });

    const compiler = new Compiler({
      project,
      outputDir,
      schemaComposer,
      buildStrategy,
      codeGenerator,
    });

    const result = await compiler.compile();

    if (!result) {
      return result;
    }

    return true;
  };

  if (!watch) {
    const result = await execute();

    if (!result) {
      process.exit(1);
    }
  } else {
    // Execute
    await execute();

    const keyPressListener = () => {
      // Watch for escape key presses
      logger.info(
        `${intlMsg.commands_build_keypressListener_watching()}: ${project.getManifestDir()}`
      );
      logger.info(intlMsg.commands_build_keypressListener_exit());
      readline.emitKeypressEvents(process.stdin);
      process.stdin.on("keypress", async (str, key) => {
        if (
          key.name == "escape" ||
          key.name == "q" ||
          (key.name == "c" && key.ctrl)
        ) {
          await watcher.stop();
          process.kill(process.pid, "SIGINT");
        }
      });

      if (process.stdin.setRawMode) {
        process.stdin.setRawMode(true);
      }

      process.stdin.resume();
    };

    keyPressListener();

    // Watch the directory
    const watcher = new Watcher();

    watcher.start(project.getManifestDir(), {
      ignored: [outputDir + "/**", project.getManifestDir() + "/**/wrap/**"],
      ignoreInitial: true,
      execute: async (events: WatchEvent[]) => {
        // Log all of the events encountered
        for (const event of events) {
          logger.info(`${watchEventName(event.type)}: ${event.path}`);
        }

        // Execute the build
        await execute();

        // Process key presses
        keyPressListener();
      },
    });
  }

  process.exit(0);
}
