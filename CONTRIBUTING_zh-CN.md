# 设置开发环境

请确保已在你的设备上安装 **Git**、**Node.js**（v20+）、**PNPM**（v8+）。

我们推荐使用 [**VSCode**](https://code.visualstudio.com/) 作为你的代码编辑器，这不是一个规定，但这会让你更快地投入开发，并且接下来的部分内容将在此基础上进行编写。

克隆项目，并在项目根目录运行：

```shell
pnpm install
```

# 投入开发

本仓库是 Monorepo，所有包放置在 `packages` 目录中，每个包有不同的开发流程，可前往对应的包目录查看 `README.md` 文件了解更具体的贡献指南。

# 独立章节

由于一些包的贡献指南存在许多相似内容，因此将其整合到本章的各小节中。您无需单独查看本章内容，只有在某个包的贡献指南明确指出时才需要阅读。

## 开发流程 A

运行：

```shell
pnpm run dev
```

启动 `watch` 模式，即可开始开发，所有改动会自动被编译。

你也可以直接在仓库的根目录运行以上命令，以同时启动所有包的 `watch` 模式。

## 构建流程 A

运行：

```shell
pnpm run build
```

即可构建包。

你也可以直接在仓库的根目录运行以上命令，以同时构建所有包。

## 发布流程 A

当准备发布包的新版本时，请按照以下步骤进行：

1. 运行 `pnpm version xxx` 命令更改版本号。
2. 将所有修改提交并推送。
3. 运行 `pnpm publish` 命令。
