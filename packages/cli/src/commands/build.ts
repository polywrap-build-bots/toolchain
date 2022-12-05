import { Command, Program } from "./types";
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
  getProjectFromManifest,
  isPolywrapManifestLanguage,
  isPluginManifestLanguage,
  generateWrapFile,
  polywrapManifestLanguages,
  pluginManifestLanguages,
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
import { defaultCodegenDir } from "../lib/defaults/defaultCodegenDir";

import fs from "fs";
import path from "path";
import readline from "readline";
import { Env, PolywrapClient } from "@polywrap/client-js";
import { PolywrapManifest } from "@polywrap/polywrap-manifest-types-js";
import { IClientConfigBuilder } from "@polywrap/client-config-builder-js";

const defaultOutputDir = "./build";
const defaultStrategy = SupportedStrategies.VM;
const strategyStr = intlMsg.commands_build_options_s_strategy();
const defaultManifestStr = defaultPolywrapManifest.join(" | ");
const pathStr = intlMsg.commands_build_options_o_path();

const supportedProjectTypes = [
  ...Object.values(polywrapManifestLanguages),
  ...Object.values(pluginManifestLanguages),
];

type BuildCommandOptions = {
  manifestFile: string;
  outputDir: string;
  configBuilder: IClientConfigBuilder;
  codegen: boolean; // defaults to false
  codegenDir: string;
  wrapperEnvs: Env[];
  watch?: boolean;
  strategy: SupportedStrategies;
  verbose?: boolean;
  quiet?: boolean;
  logFile?: string;
};

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
      .option(`--codegen`, `${intlMsg.commands_build_options_codegen()}`)
      .option(
        `--codegen-dir`,
        `${intlMsg.commands_build_options_codegen_dir({
          default: defaultCodegenDir,
        })}`
      )
      .option(
        `--wrapper-envs <${intlMsg.commands_common_options_wrapperEnvsPath()}>`,
        `${intlMsg.commands_common_options_wrapperEnvs()}`
      )
      .option(
        `-s, --strategy <${strategyStr}>`,
        `${intlMsg.commands_build_options_s()}`,
        defaultStrategy
      )
      .option(`-w, --watch`, `${intlMsg.commands_build_options_w()}`)
      .option("-v, --verbose", intlMsg.commands_common_options_verbose())
      .option("-q, --quiet", intlMsg.commands_common_options_quiet())
      .option(
        `-l, --log-file [${pathStr}]`,
        `${intlMsg.commands_build_options_l()}`
      )
      .action(async (options) => {
        await run({
          ...options,
          manifestFile: parseManifestFileOption(
            options.manifestFile,
            defaultPolywrapManifest
          ),
          configBuilder: await parseClientConfigOption(options.clientConfig),
          wrapperEnvs: await parseWrapperEnvsOption(options.wrapperEnvs),
          outputDir: parseDirOption(options.outputDir, defaultOutputDir),
          codegenDir: parseDirOption(options.codegenDir, defaultCodegenDir),
          strategy: options.strategy,
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

async function run(options: BuildCommandOptions) {
  const {
    watch,
    manifestFile,
    outputDir,
    configBuilder,
    wrapperEnvs,
    strategy,
    codegen,
    codegenDir,
    verbose,
    quiet,
    logFile,
  } = options;
  const logger = createLogger({ verbose, quiet, logFile });

  if (wrapperEnvs) {
    configBuilder.addEnvs(wrapperEnvs);
  }

  // Get Client
  const client = new PolywrapClient(configBuilder.buildCoreConfig(), {
    noDefaults: true,
  });

  const project = await getProjectFromManifest(manifestFile, logger);

  if (!project) {
    return;
  }

  await project.validate();

  const manifest = await project.getManifest();
  const language = manifest.project.type;

  let execute: () => Promise<boolean>;

  if (isPolywrapManifestLanguage(language)) {
    await validateManifestModules(manifest as PolywrapManifest);

    const buildStrategy = createBuildStrategy(
      strategy,
      outputDir,
      project as PolywrapProject
    );

    execute = async (): Promise<boolean> => {
      const schemaComposer = new SchemaComposer({
        project,
        client,
      });

      if (codegen) {
        const codeGenerator = new CodeGenerator({
          project,
          schemaComposer,
          codegenDirAbs: codegenDir,
        });
        const codegenSuccess = await codeGenerator.generate();

        if (!codegenSuccess) {
          logger.error(intlMsg.commands_build_error_codegen_failed());
          return false;
        }
      }

      const compiler = new Compiler({
        project: project as PolywrapProject,
        outputDir,
        schemaComposer,
        buildStrategy,
      });

      const result = await compiler.compile();

      if (!result) {
        return result;
      }

      return true;
    };
  } else if (isPluginManifestLanguage(language)) {
    execute = async (): Promise<boolean> => {
      const schemaComposer = new SchemaComposer({
        project,
        client,
      });

      // Output the built manifest
      const manifestPath = path.join(outputDir, "wrap.info");

      try {
        if (codegen) {
          const codeGenerator = new CodeGenerator({
            project,
            schemaComposer,
            codegenDirAbs: codegenDir,
          });
          const codegenSuccess = await codeGenerator.generate();

          if (!codegenSuccess) {
            logger.error(intlMsg.commands_build_error_codegen_failed());
            return false;
          }
        }

        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir);
        }

        await generateWrapFile(
          await schemaComposer.getComposedAbis(),
          await project.getName(),
          "plugin",
          manifestPath,
          logger
        );
      } catch (err) {
        logger.error(err.message);
        return false;
      }

      return true;
    };
  } else {
    logger.error(
      intlMsg.commands_build_error_unsupportedProjectType({
        supportedTypes: supportedProjectTypes.join(", "),
      })
    );
    return;
  }

  if (!watch) {
    const result = await execute();

    if (!result) {
      process.exit(1);
    }

    process.exit(0);
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
}
