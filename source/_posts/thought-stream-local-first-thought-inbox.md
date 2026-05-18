---
title: 三秒 capture，AI 整理——ThoughtStream 的轻量想法工作流
date: 2026-05-17 00:10
tags:
  - macOS
  - Swift
  - 开源
  - 个人项目
---

如果你跟我一样，会在写代码、读论文、开会的时候突然闪过一个念头——「这个方向值得研究一下」「下周要不要试试这个框架」「哦对，还有个事儿忘了」——那你大概也面临同一个问题：

**记下来太麻烦，不记又怕忘。**

很多笔记工具不是不能存，而是太早要求你整理——选文件夹、起标题、打标签……这些动作在想法冒出来那一刻都是打断。

所以我写了一个 macOS 小工具叫 **ThoughtStream**。

<!-- more -->

## 它做什么

**一句话：全局快捷键唤出一个输入框，打字，回车，消失。**

- `Shift + Command + Space` 唤出覆盖层
- 输入想法，`Enter` 保存
- `Esc` 取消
- 完事，继续工作

整个交互像 Spotlight 一样轻量。没有文件夹选择、没有标题栏、没有标签强迫症。你在 capture 阶段唯一需要做的事情就是：**打字。**

![捕获界面](/imgs/capture-input-zh.png)

## 不是又一个笔记软件

ThoughtStream 不是为了替代 Obsidian 或 Notion。它只做一件事：**让 capture 的摩擦降到最低。**

传统的笔记流程是：

> 捕获 → 组织 → 回顾

很多工具把组织和捕获放在同一个步骤里。ThoughtStream 把这两个阶段**明确拆开**：

1. **捕获阶段**：只管记，不管整理
2. **回顾阶段**：交给 AI 自动聚类、提取待办、生成总结

这样你在工作流中不会因为「这句话该放哪个文件夹」而被拉出心流。

## 实际用起来是什么样

拿我自己来说，平时写代码或者读论文的时候，经常突然冒出一些念头——比如「这个思路可以跟之前那篇论文结合一下」「下周调研一下这个框架的生态」「哦对，周末要去买个东西」。

以前的流程是：掏出手机 → 打开备忘录 → 选分类 → 写标题 → 打字 → 保存。一套下来十几秒过去了，回到电脑前思路已经断了。

现在的是：

> `Shift + Command + Space` → 打字 → `Enter`

三秒完事。**不需要选择位置、不需要起标题、不需要分类。** 你只负责把想法流式地倒进来。

然后每过三个小时，我的 AI Agent 会自动跑一遍：

```
thought export --from 3h --json
```

把过去三小时随手记下来的零散想法拉出来，**按主题聚类、提取待办、标记出值得深入的方向**。最后生成一段小结推给我。

整个过程零人工介入——你不用打开任何笔记软件、不用归类、不用整理。capture 归你，整理归 AI。

你也可以拉长周期跑周总结：

```
thought export --from 7d --json | llm -s "帮我按主题聚类，提取待办事项"
```

这相当于你的想法经过了两层过滤——第一层是你的瞬时记录，第二层是 AI 的自动归纳。你只需要在最需要专注的时刻，做最少的事。

## 两个入口

ThoughtStream 有两个使用方式：

### 1. GUI 覆盖层

macOS 原生 Spotlight 风格面板，毛玻璃效果。支持一些轻量斜杠命令：

- `/tail` — 最近记录
- `/search <关键词>` — 全文搜索
- `/today` — 今天的记录
- `/tag <标签>` — 按标签过滤
- `/help` — 查看所有命令

![搜索演示](/imgs/search-onboarding-zh.png)

![结果浏览](/imgs/tail-results-zh.png)

### 2. CLI

`thought` 命令行工具，更侧重查询和自动化：

```bash
thought tail 100 --json          # 最近100条
thought search "idea" --json     # 搜索
thought today --json             # 今日捕获
thought export --from 7d --json  # 导出最近一周
thought stats --json             # 统计
```

这个 CLI 就是为 AI 集成设计的——你可以把 thoughts 直接 pipe 给大模型做周总结、主题聚类、待办提取：

```bash
thought export --from 7d --json | llm -s "提炼本周关键词和待办"
```

**capture 的时候零摩擦，review 的时候交给 AI。**

## 存储

全部存在本地 SQLite，默认路径：

```
~/Library/Application Support/ThoughtStream/thoughts.sqlite3
```

支持 FTS5 全文索引，也支持自定义存储位置（比如放到 iCloud Drive）。没有云同步，没有账号，没有订阅，没有遥测。

## 技术栈

- **语言**：Swift 6
- **UI**：原生 AppKit（NSWindow + NSVisualEffectView）
- **存储**：SQLite3 + FTS5
- **构建**：Swift Package Manager
- **打包**：DMG / ZIP 自动构建脚本


## 当前状态

项目已经可以日常使用了，主要功能包括：

- ✅ 全局快捷键捕获
- ✅ 斜杠命令搜索/过滤
- ✅ CLI 查询和导出
- ✅ 内联 `#标签` 自动提取
- ✅ 归档、置顶、编辑
- ✅ 双语文档（中文 / English）
- ✅ FTS5 全文索引
- ✅ 一键安装脚本

你可以在这里找到它：

<https://github.com/MoozieLee/thought-stream>

安装只需要一行：

```bash
curl -fsSL https://raw.githubusercontent.com/MoozieLee/thought-stream/main/scripts/install.sh | sh
```

## 最后

ThoughtStream 的核心思路其实很简单：**capture 和 review 是两件不同的事，不应该在同一个界面里解决。**

如果你也是那种天天有很多念头闪过的类型，试试看——也许你会发现，少想「怎么记」之后，反而记得更多了。至于整理？**那是 AI 的事** 😌
