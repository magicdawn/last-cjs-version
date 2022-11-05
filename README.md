<!-- AUTO_GENERATED_UNTOUCHED_FLAG -->

# last-cjs-version

> get last cjs version of a module

[![Build Status](https://img.shields.io/travis/magicdawn/last-cjs-version.svg?style=flat-square)](https://travis-ci.org/magicdawn/last-cjs-version)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/last-cjs-version.svg?style=flat-square)](https://codecov.io/gh/magicdawn/last-cjs-version)
[![npm version](https://img.shields.io/npm/v/last-cjs-version.svg?style=flat-square)](https://www.npmjs.com/package/last-cjs-version)
[![npm downloads](https://img.shields.io/npm/dm/last-cjs-version.svg?style=flat-square)](https://www.npmjs.com/package/last-cjs-version)
[![npm license](https://img.shields.io/npm/l/last-cjs-version.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install

```sh
$ npm i -S last-cjs-version
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

```
$ last-cjs-version execa
5.1.1

$ last-cjs-version got
11.8.3
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
