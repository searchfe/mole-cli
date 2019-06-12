# mole-cli
![Language](https://img.shields.io/badge/-TypeScript-blue.svg)
[![Build Status](https://travis-ci.org/searchfe/mole-cli.svg?branch=master)](https://travis-ci.org/searchfe/mole-cli)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

cli for creating a molecule project

## Usage 基本用法

```bash
> mole <command> [options] <args ...>
```

## commands 命令

### init 初始化

```bash
> init [options] <模块名>
```


### build 编译

```bash
> build [options] [task名...]
```

Options:

| options           | Description |
|--------------------|-------------|
| --cwd [path] | 指定一个新的cwd (当前工作目录) |
| -T, --tasks | 查看gulp task |
| -f, --gulpfile [file] | 指定gulpfile路径 |
| -h, --help | output usage information |

### lint 代码规范

```bash
> lint [options]
```

Options:

| options           | Description |
|--------------------|-------------|
| --fix | 自动修复lint问题 |
| -h, --help | output usage information |