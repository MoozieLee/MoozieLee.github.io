---
title: Mac 上配置多个版本的 vscode
date: 2025-06-23 14:26:14
tags:
    - macOS
    - vscode
    - 远程开发
categories:
    - 技术经验
---
在日常开发中，我们可能会因为插件兼容性、系统兼容性（如 glibc 版本）、远程开发需求等原因，需要在一台 Mac 电脑上同时使用多个不同版本的 Visual Studio Code（以下简称 VSCode）。本文将总结在 macOS 上配置多版本 VSCode 的完整流程和经验。

# 背景

- 某些远程服务器环境较旧（如仅支持 glibc 2.17），新版本 VSCode 无法兼容，必须使用特定的老版本 VSCode 进行连接
- 同时希望保留新版本 VSCode，以便使用本地最新特性
- 希望每个版本的插件和配置互不影响

# 下载安装不同版本 VSCode

1. 打开 [VSCode 版本下载页](https://code.visualstudio.com/updates)
2. 选择目标版本，下载 macOS 的 ZIP 包
3. 解压后，重命名为：`Visual Studio Code - 1.85.app` （这里使用的是 VSCode 1.85）
4. 移动到应用程序目录

# 为每个版本配置独立数据目录

默认情况下，VSCode 会将用户配置保存在 `~/Library/Application Support/Code` 目录中，插件则存储在 `~/.vscode/extensions`。如果通过桌面图标直接启动 VSCode，程序将自动加载这两个位置的配置和插件文件。

若希望在一台设备上同时使用多个版本的 VSCode，并确保它们之间的配置互不干扰，就需要通过命令行方式启动，并显式指定各自的配置目录。VSCode 提供了 `--user-data-dir` 参数用于指定用户配置目录，`--extensions-dir` 参数用于指定插件存放目录。

首先为用户配置和插件创建对应的文件夹

```bash
mkdir ~/vscode/vscode-1.85/user-data
mkdir ~/vscode/vscode-1.85/extensions
```

在 `~/.zshrc` 或 `~/.bashrc` 中配置 alias：

```bash
alias vscode-1.85="/Applications/Visual\ Studio\ Code\ -\ 1.85.app/Contents/Resources/app/bin/code \
  --user-data-dir=$HOME/vscode/vscode-1.85/user-data \
  --extensions-dir=$HOME/vscode/vscode-1.85/extensions"
```

# 防止自动更新

在使用命令行启动前，可以在目标的用户配置目录中手动创建设置文件，例如`./user-data/User/settings.json`，并添加以下配置以禁止插件和程序自动更新：

```JSON
{
    "extensions.autoUpdate": false,
    "update.mode": "none"
}
```

这样可以避免 VSCode 启动后自动检查并安装新版本，确保所用版本稳定不变。

完成配置后，即可使用如下命令启动指定版本的 VSCode：

```bash
vscode-1.85 yourfilepath
```

# 注意事项

双击 `.app` 文件会忽略 alias 中的参数，直接加载默认配置。因此建议：

- **不要手动双击 `.app` 启动**，而是从 terminal 通过 `vscode-1.85` 启动
- 或者创建 Automator 快捷方式，封装带参数的 shell 启动命令


# 总结

通过配置 alias + 独立目录 + 禁止自动更新，我们可以在 Mac 上优雅地运行多个 VSCode 版本，既保持本地开发效率，又兼容老旧环境。
