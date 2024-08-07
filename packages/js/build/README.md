<!-- 标志 -->
<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="150" src="https://rollupjs.org/rollup-logo.svg" alt="logo">
  </a>
</p>
<!-- 名字 -->
<h1 align="center">JavaScript Build Tool</h1>
<!-- 描述 -->
<p align="center">A modern JavaScript building tool out of the box.</p>
<br/>

Read this in other languages: English | [简体中文](./README_zh-CN.md)

## Introduction

Due to historical factors in JavaScript and the increasing complexity of modern engineering, building a modern, cross-platform JavaScript library is not simple. This tool provides developers with a quick and efficient solution to simplify this process through good presets and rich features.

- Good presets based on Rollup, ready to use out of the box
- Support for TypeScript
- Support for exporting both ESM and CJS module formats simultaneously
- Support for subpath exports
- Support for subpath imports
- Support for automatic generation of conditional constants
- Support for automatic handling of TypeScript Paths

## Installation

Can be installed as a project development dependency:

```shell
npm install -D @xenon.js/build
```

Or run the build tool directly:

```shell
npx xe-build
```

## Quick Start

Let's create an empty project first:

```shell
npm init -y
```

The build tool uses `src` as the source code directory, so please create a script file `lib.ts` in the `src` directory:

```ts
export const str = "hello world.";
```

To use this script as the library's entry point, configure in `package.json`:

```json
{
  "exports": "./dist/lib.js"
}
```

Now you can run `npx xe-build` to build.

You'll see the build artifacts output in the `dist` directory, and you've completed the simplest library build!

If you want to automatically build when source files change, run:

```shell
npx xe-build -w
```

## Path Auto-Mapping Rules

In the `bin` and `exports` fields, only build artifact paths (such as `./dist/lib.js`) are used, so the tool will map them to source files.

First, you need to know that the tool will merge all subpaths with the same conditions into one build.

This means that if your project has ESM artifacts for `import` and CJS artifacts for `require`, even if there's only one entry point, two builds will be executed because there are two conditions. For more scenarios that may lead to multiple builds, refer to [Conditional Exports](#conditional-exports).

So if there are multiple builds, of course, they can't all output to the root of `dist`, otherwise there might be overwriting. Therefore, the tool will use the following rules:

- When there's only one build, `dist/xxx.js` will be directly mapped to `src/xxx.ts`
- When there are multiple builds, if your source file is `src/xxx.ts`, don't directly configure `dist/xxx.js`, because the tool will map starting from the subdirectory of `dist`, for example, `dist/es/xxx.js` will be mapped to `src/xxx.ts`

Note that the mapping rules for `bin` configuration are different, it will always map starting from `dist/bin`, for example, `dist/bin/xxx.js` will be mapped to `src/xxx.ts`, and its existence will be considered as having multiple builds.

## More Features

### Multiple Entry Points

If your library needs multiple entry points, you just need to configure the `exports` field according to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-exports):

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./sub": "./dist/sub/index.js"
  }
}
```

The tool will traverse all subpaths in `exports` and use all subpaths as entry points for building.

In the above example, `./src/index.ts` and `./src/sub/index.ts` will be built as two entry points.

Different subpaths with the same conditions will be merged into one build as multiple entry points, rather than as multiple independent builds.

### Conditional Exports

For a detailed introduction to conditional exports, please refer to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#conditional-exports).

Conditional exports have several typical use cases:

#### Generate TypeScript Declaration Files

When you need to generate `.d.ts` TypeScript declaration files, you can add a `types` condition to the entry points in `exports`:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

#### Export Both ESM and CJS Modules Simultaneously

Just add `import` or `require` conditions to the entry points in `exports`:

```json
{
  "exports": {
    ".": {
      "types": "./dist/es/index.d.ts",
      "import": "./dist/es/index.js",
      "require": "./dist/cjs/index.cjs"
    }
  }
}
```

If there are no explicit `import` or `require` conditions, the output module format will be determined based on the `type` field in `package.json`.

#### Export Different Entry Points Based on Platform

Suppose your library needs to export different entry points based on the execution environment, you can do this:

```json
{
  "exports": {
    ".": {
      "node": {
        "types": "./dist/node-es/index.d.ts",
        "import": "./dist/node-es/index.js",
        "require": "./dist/node-cjs/index.cjs"
      },
      "default": {
        "types": "./dist/default-es/index.d.ts",
        "import": "./dist/default-es/index.js",
        "require": "./dist/default-cjs/index.cjs"
      }
    },
    "./sub": {
      "node": {
        "types": "./dist/node-es/sub/index.d.ts",
        "import": "./dist/node-es/sub/index.js",
        "require": "./dist/node-cjs/sub/index.cjs"
      },
      "default": {
        "types": "./dist/default-es/sub/index.d.ts",
        "import": "./dist/default-es/sub/index.js",
        "require": "./dist/default-cjs/sub/index.cjs"
      }
    },
  }
}
```

The above example will generate four build tasks:

1. Build conditions: `node`, `import`, `types`, entry points: `.`, `./sub`
2. Build conditions: `node`, `require`, entry points: `.`, `./sub`
3. Build conditions: `default`, `import`, `types`, entry points: `.`, `./sub`
4. Build conditions: `default`, `require`, entry points: `.`, `./sub`

### Using Build Condition Constant Module

The build condition constant module is a built-in plugin of the build tool, which will generate all conditions used in `exports` as constants and export them through the `internal/constants` module.

For example, the build example above has four conditions in total: `node`, `import`, `require`, `default` (`types` will be ignored).

So it will generate a module similar to the following:

```ts
declare module "internal/constants" {
    /**
     * Compile target is NodeJS
     */
    export const NODE: boolean;

    /**
     * Compile target is Default
     */
    export const DEFAULT: boolean;

    /**
     * Compile target is ESM
     */
    export const IMPORT: boolean;

    /**
     * Compile target is CJS
     */
    export const REQUIRE: boolean;
}
```

You can create a `constants.d.ts` file similar to the above content to provide code hints.

Note that the names will be converted to all uppercase, and can be used in the project like this:

```ts
import { NODE } from "internal/constants";

if (NODE) {
  console.log("Running in Node.js.");
} else {
  console.log("Running in other platform.");
}
```

When a `node` condition exists in a build, the `NODE` constant will be `true`, to achieve the effect of tree-shaking or executing different logic.

You can create a [configuration file](#using-configuration-file) and add a `constants` field to add more build constants on this basis:

```js
import { readFileSync } from "fs";

const { version } = JSON.parse(
    readFileSync("./package.json", { encoding: "utf-8" }),
);

export default {
    constants: {
        VERSION: version,
    },
};
```

### Using Subpath Imports

For a detailed introduction to subpath imports, please refer to the [Node.js documentation](https://nodejs.org/docs/latest-v20.x/api/packages.html#subpath-imports).

Suppose you have three files at the same time:

- `lib.ts`
- `lib.node.ts`
- `lib.browser.ts`

And configured the `imports` field:

```json
{
  "imports": {
    "#lib.ts": {
      "node": "./src/lib.node.ts",
      "browser": "./src/lib.browser.ts",
      "default": "./src/lib.ts"
    }
  }
}
```

Then you can import different modules based on the platform by importing this path internally in the project:

```ts
import * as lib from "#lib.ts";
```

### Building Executable Entry Points

If your library needs to build an executable entry point, you can configure it through the `bin` field:

```json
{
  "bin": {
    "cli": "./dist/bin/cli.js"
  }
}
```

The tool will only process files in the `dist/bin` path, other paths will be ignored, and it will generate a separate `bin` build, so note that if there are also target paths under the `dist/bin` directory in `exports`, they will be executed as the same build.

You can create a [configuration file](#using-configuration-file) and add a `binConditions` field to configure the conditions to use:

```js
export default {
    binConditions: ["node", "import"],
};
```

## More Configuration

### Command Line Options

You can execute

```shell
npx xe-build -h
```

to view all available command line options.

Some configurations can be passed directly as command line parameters, for example:

```shell
npx xe-build --binConditions node production --onlyBuildConditions node
```

Options passed as command line parameters will override those in the configuration file.

### Using Configuration File

You can create a `xebuild.config.js` configuration file in the project root directory, and the build tool will read this file path as the configuration by default.

```js
/**
 * @type {import("@xenon.js/build").ConfigInput}
 */
export default {};
```

If you want to put the configuration file in another path, please specify the configuration file path when executing the build:

```shell
npx xe-build --config ./configs/xebuild.config.js
```
If a relative path is passed, it needs to be relative to the execution directory.

## Notes

- Currently, source file suffixes other than `.ts` and build artifact suffixes other than `.js` are not supported.
- Currently, exporting or importing subpaths containing `*` wildcards is not supported.
- Currently, customizing the source code directory `src` and build output directory `dist` is not allowed.
- The value of the `types` condition must be a string and cannot be nested with sub-conditions.
- The path of the `types` declaration file must correspond to the path of the source code, and as long as one entry point needs to generate a declaration file, all source code in a single build will generate declaration files, because TypeScript does not support generating declaration files separately.
- Currently, as long as conditions other than `import`, `require`, `default` appear, it will be considered as multiple builds.
- `redirects` is a legacy option and should be replaced with [Conditional Imports](#using-subpath-imports).

## Contributing

If you want to contribute to the project, please refer to the [Contribution Guide](./CONTRIBUTING.md).

## License

[MIT @ SmallMain](./LICENSE)
