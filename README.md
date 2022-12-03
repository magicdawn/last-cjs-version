# last-cjs-version

> get last cjs version of a module

[![Build Status](https://img.shields.io/github/workflow/status/magicdawn/last-cjs-version/ci/main?style=flat-square)](https://github.com/magicdawn/last-cjs-version/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/last-cjs-version.svg?style=flat-square)](https://codecov.io/gh/magicdawn/last-cjs-version)
[![npm version](https://img.shields.io/npm/v/last-cjs-version.svg?style=flat-square)](https://www.npmjs.com/package/last-cjs-version)
[![npm downloads](https://img.shields.io/npm/dm/last-cjs-version.svg?style=flat-square)](https://www.npmjs.com/package/last-cjs-version)
[![npm license](https://img.shields.io/npm/l/last-cjs-version.svg?style=flat-square)](http://magicdawn.mit-license.org)

# Why

modules are moving to ES module. But when we want keep using CommonJS, and tired of using async
dynamic `import()`, u can use this to find last CommonJS version of the module.

## Install

```sh
$ npm i -g last-cjs-version

# or
$ pnpm add -g last-cjs-version
```

## cli

```sh
$ last-cjs-version
last-cjs-version <pkg>

get last cjs version of package

位置：
  pkg  package name                                                     [字符串]

选项：
  -m, --major    major version only                       [布尔] [默认值: false]
  -h, --help     显示帮助信息                                             [布尔]
  -v, --version  显示版本号                                               [布尔]

缺少 non-option 参数：传入了 0 个, 至少需要 1 个
```

```sh
$ last-cjs-version execa
5.1.1

$ last-cjs-version got
11.8.3

$ last-cjs-version execa -m
5

$ echo pnpm add execa@`last-cjs-version -m execa`
pnpm add execa@5

# this will exec 'pnpm add execa@5'
$ pnpm add execa@`last-cjs-version -m execa`
```

### `add` command

find out the version and exec install command for you

```sh
$ last-cjs-version add execa -m
[last-cjs-version] detected package manager: pnpm
[last-cjs-version] executing: pnpm add execa@5

Already up to date
Progress: resolved 332, reused 323, downloaded 0, added 0, done
Done in 2.1s
```

## API

```ts
import last-cjs-version from 'last-cjs-version'

lastCjsVersion(pkg: string) => Promise<string>
```

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

the MIT License http://magicdawn.mit-license.org
