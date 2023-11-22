<!-- 标志 -->
<p align="center">
  <a target="_blank" rel="noopener noreferrer">
    <img width="280" src="https://user-images.githubusercontent.com/1503156/112012067-d5cdf580-8b63-11eb-819a-1c32cf253b25.png" alt="logo">
  </a>
</p>
<!-- 名字 -->
<h1 align="center">Cocos Creator Types</h1>
<!-- 描述 -->
<p align="center">TypeScript declaration files extracted from Cocos Creator engine.</p>
<br/>

阅读其它语言版本: [English](./README.md) | 简体中文

## 简介

运行 `npm install @xenon.types/cocos-dts`，并修改 `tsconfig.json` 的 `typeRoots` 字段，然后就能像已经安装了引擎一样获得编码提示。

## 使用

1. 安装 npm 包：

```shell
npm install @xenon.types/cocos-creator
```

如无特殊说明，该包的版本号与引擎版本一一对应，比如你想安装对应 Cocos Creator v3.8.0 的类型包，那么可以：

```shell
npm install @xenon.types/cocos-creator@3.8.0
```

2. 在 `tsconfig.json` 中向 `compilerOptions` 的 `typeRoots` 字段添加 `@xenon.types` 的路径，以让 TypeScript 能够找到类型声明文件：

```json5
"typeRoots": [
    "./node_modules/@types",
    "./node_modules/@xenon.types",
],
```

## 贡献

如果你想为项目出一份力，请参阅[贡献指南](./CONTRIBUTING_zh-CN.md)。

## 许可证

[MIT @ SmallMain](../LICENSE)