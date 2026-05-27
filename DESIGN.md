# Label Analyzer - 标注数据分析工具

## 项目概述

一个纯前端 HTML 工具，用于分析标注平台导出的 JSONL 数据。上传项目 config 和数据文件后，自动解析字段，用户选择想分析的字段，生成可视化图表和统计报告。

**设计原则：通用化**——不绑定任何特定项目，通过 config 自动适配不同项目的字段结构。

## 使用流程

```
打开 HTML → 上传 Config → 上传 JSONL → (可选)启用 Model 映射 → 选择分析字段 → 查看结果
```

## 页面布局（定稿：左右分栏）

```
┌─ TopBar ──────────────────────────────────────────────────────────┐
│ Logo: Label Analyzer  v2                                          │
├───────────────────────┬───────────────────────────────────────────┤
│      SIDEBAR (330px)  │              CONTENT (flex:1)              │
│                       │                                           │
│  ┌─ 数据上传 ────────┐│  ┌─ 分析结果卡片 ───────────────────────┐│
│  │ ┌──────┬──────┐   ││  │ 分析结果 · 3个字段 · 项目名          ││
│  │ │⚙️    │📊    │   ││  │                                      ││
│  │ │Config│JSONL │   ││  │ ┌─ 字段A (单选) ────────────────────┐││
│  │ │文件  │数据  │   ││  │ │ 统计卡片 + 饼图/柱状图 + 明细表格 │││
│  │ └──────┴──────┘   ││  │ └──────────────────────────────────┘││
│  │ [Config下拉切换]   ││  │                                      ││
│  └───────────────────┘│  │ ┌─ 字段B (单选+Model映射) ──────────┐││
│                       │  │ │ 🔄 按真实Model统计               │││
│  ┌─ 🔄 Model 映射 ──┐│  │ │ slime更好 42% / 100b更好 38%     │││
│  │ 启用映射 [开关]   ││  │ │ (原始分布可折叠查看)              │││
│  │ ● slime = 回复1   ││  │ └──────────────────────────────────┘││
│  │ ● 100b  = 回复2   ││  │                                      ││
│  │ 说明文字...        ││  │ ┌─ 字段C (排序控件) ────────────────┐││
│  └───────────────────┘│  │ │ 平均排名 + 堆叠柱状图 + 胜率矩阵  │││
│                       │  │ └──────────────────────────────────┘││
│  ┌─ 选择分析字段 ────┐│  └──────────────────────────────────────┘│
│  │                   ││                                           │
│  │ ▶ 组合控件A  🔗   ││          （未选择字段时显示空状态）         │
│  │   ☑ 子字段1 单选  ││                                           │
│  │     0 = XXX       ││                                           │
│  │     1 = XXX       ││                                           │
│  │   ☐ 子字段2 文本  ││                                           │
│  │ ☑ 字段B     📝   ││                                           │
│  │ ▶ 字段C     📊   ││                                           │
│  │                   ││                                           │
│  └───────────────────┘│                                           │
│                       │                                           │
│  ┌─ Footer ──────────┐│                                           │
│  │ [🚀 开始分析]     ││                                           │
│  │ 已选 3 个字段     ││                                           │
│  └───────────────────┘│                                           │
└───────────────────────┴───────────────────────────────────────────┘
```

### 侧边栏设计

**上传区域：**
- 两个虚线框并排（Config + JSONL），支持点击上传
- 上传成功后虚线框变实线+绿色+显示文件名
- 下方 Config 下拉切换（内置多套config时可快速切换）

**Model 映射面板（可选）：**
- 始终显示在上传区和字段选择器之间，默认折叠
- 展开后显示开关 + 从 JSONL 的 responses 数组自动检测到的 model 列表
- 每个 model 显示：色点 + model名 + 对应的回复序号（`= 回复1`）
- 启用后，选项中的「回复1更好/回复2更好」「res_1/res_2」自动映射到真实 model 名
- 支持 2 个及以上 model
- 映射逻辑：`responses[i].model` ↔ `回复{i+1}` / `res_{i+1}`

**字段选择器（手风琴）：**
- 顶层字段列表，每项显示：图标 + 字段名 + 类型标签
- **组合控件（depend/form_list）**：点击展开手风琴，显示子字段列表，每个子字段独立勾选
- **独立字段（radio/textarea等）**：直接点击勾选checkbox
- 已选字段显示 `N✓` badge
- 手风琴高度**动态计算**（基于 `scrollHeight`），不会截断内容

**字段小字说明：**
- 类型名称（单选/文本框/组合控件等）
- 条件依赖说明：格式为 `当「字段名」=「值」时显示`
- 选项列表：每个选项独占一行，格式为 `value = label`

**底部：**
- 「开始分析」按钮（未选字段时disabled）
- 已选字段计数

## 数据结构说明

### Config 文件格式（标注平台导出）

```json
{
  "id": "xxx",
  "name": "项目名称",
  "config_data": [
    {
      "dataIndex": "字段key",
      "title": "字段显示名",
      "valueType": "字段类型",
      "columns": [ /* 子字段/嵌套配置 */ ]
    }
  ]
}
```

### JSONL 数据格式

每行一条记录：
```json
{
  "id": "xxx",
  "responses": [
    { "model": "modelA", "reply": "..." },
    { "model": "modelB", "reply": "..." }
  ],
  "labels": [
    {
      "model": "assistant_0",
      "tagger_id": "xxx",
      "result": {
        "dataIndex_key": value
      }
    }
  ]
}
```

**关键：** `responses` 数组中的顺序在不同记录间随机打乱（避免标注偏差），因此需要 Model 映射功能。

## 已支持的控件类型 & 分析策略

### 控件分组

| 分组 | 控件类型 | 分析方式 | 图表 |
|------|---------|---------|------|
| **可分布统计** | radio, checkbox | 各选项值分布（支持 Model 映射） | 饼图 + 柱状图 + 明细表 |
| **文本类** | textarea, textarea_auto_height, text, draggable_md_editor | 非空率、平均字数、最大字数 | 统计卡片 |
| **文本标注** | text_label, tag | 标注覆盖率、标注数量、各标签分布 | 饼图 + 柱状图 |
| **排序控件** | responses_ranking | 平均排名、各位次分布、胜率矩阵 | 堆叠柱状图 + 矩阵表格 |
| **拉框标注** | image_annotation | 有标注率、总框数、平均每条框数、Tag分布 | 饼图 + 柱状图 |
| **其他** | form_list, screenshot, editable_link 等 | 基础统计（非空率、条目数等） | 统计卡片 |

### 组合控件处理

- **depend（有依赖关系的控件组）**：展开为子字段列表，每个子字段独立分析
- **form_list（不定项列表）**：展开为子字段列表，每个子字段独立分析
- 子字段的分析方式由其自身的 `valueType` 决定

### Model 映射模式

**场景：** 标注平台为避免标注偏差，会随机打乱 responses 顺序。标注员看到的是「回复1/回复2」，但实际对应的 model 每条不同。

**映射逻辑：**
1. 从 JSONL 的 `responses` 数组提取所有 model 名称
2. 每条记录：`responses[0].model` = 该条的「回复1」，`responses[1].model` = 「回复2」
3. 统计时：将「回复1更好」按该条的 responses 顺序翻译为「modelA更好」
4. 最终结果按真实 model 名聚合

**选项匹配规则：**
- `回复1` / `回复2` / `回复3` ...
- `res_1` / `res_2` / `res_3` ...
- 支持 2 个及以上 model

### 分析策略核心设计

**按数据格式自动推断分析方式，而非硬编码 valueType 名称。** 新增 valueType 时，只要返回值格式属于已知类型，就自动支持：

| 数据格式 | 判断方式 | 分析方式 |
|---------|---------|---------|
| number | `typeof val === 'number'` | 各值分布（结合 options 映射） |
| array of numbers | `Array.isArray && typeof [0] === 'number'` | 各选项分布 + 组合分布 |
| string | `typeof val === 'string'` | 非空率、平均字数 |
| object (annotation) | 含 `annotated` + `rects` | 标注框统计 + tag 分布 |

## 技术方案

### 技术栈
- **单文件 HTML**：不需要构建工具，双击即可打开
- **ECharts 5.x**：图表库（CDN 引入）
- **原生 JS**：不依赖框架，保持轻量
- **CSS**：内嵌样式，暗色主题

### 样式规范
- 暗色主题（背景 `#0f1117`，表面 `#161923`）
- 主色调 `#6c5ce7`（紫色），辅助色：绿/红/橙/蓝/青
- 圆角 10px（卡片）/ 6px（小元素）
- 字体：Noto Sans SC

### 大文件处理
- JSONL 文件用 FileReader + 逐行解析
- 解析过程显示进度条
- 必要时考虑 Web Worker

## 已分析的 Config 样本

共 10 套 config：

| Config | 项目名 | 主要控件类型 |
|--------|--------|-------------|
| config_numcount | 指令遵循评测集v3-数量统计 | depend(radio子字段), form_list, textarea |
| config_logic | 内部逻辑判定 | text_label(tag子字段), checkbox, textarea |
| config_IF | 指令遵循评测集-偏好判断 | radio, textarea |
| config_artifact | 搭子artifacts美观度筛选 | depend(radio子字段，5分制评分) |
| config_judgementV2 | judgement_V2 | radio, depend(draggable_md_editor), textarea, editable_link |
| config_体感测 | 标注员体感测 | textarea, radio(5选项) |
| config_学科 | 学科感知code修改 | depend(radio+draggable_md_editor), screenshot, textarea |
| config_搜索偏好 | 搜索偏好0429 | depend(radio+textarea), responses_ranking, textarea |
| config_fc拉框 | fc拉框 | depend(radio+image_annotation) |
| config_RL人工评测 | RL人工评测-20251112 | depend(radio偏好+textarea), 需Model映射 |

## 文件结构

```
/Users/lingxiaoying/projects/label-analyzer/
├── DESIGN.md                # 本设计文档
├── PROGRESS.md              # 开发进度
├── UI_IMPROVEMENT.md        # UI改进记录
├── index.html               # 原始正式版（Step 1-5，无模型汇总）
├── index_v2.html            # + 模型汇总tab
├── index_v3.html            # + 双格式 + visibleRule + 多人标注 + 导出
├── index_final.html         # ✅ 最终版（全部功能）
├── demo_features.html       # = index_final.html
├── demo_export.html         # 导出功能独立demo
├── demo_loading.html        # loading动画实验版
├── demo_model_summary.html  # 模型汇总独立demo
├── demo_final_v4.html       # 换行选项 + 动态高度（UI定稿无映射）
├── demo_final_v5.html       # UI定稿版本（含 Model 映射）
└── sample/                  # 测试用样例文件
    ├── config_*.json        # 10+ 套 config
    ├── fc_test.jsonl         # 拉框标注测试数据 (376条, 单人标注)
    ├── RL人工评测.jsonl       # RL评测数据 (382条, 需Model映射)
    ├── 体感测2605.jsonl       # 体感测评数据 (排序控件)
    └── rubic修改前后偏好0515_*/  # 偏好数据 (36条, 3人标注, 2模型)
```

## 开发计划

### Step 1：基础框架 + 文件解析
**目标：** 从demo的内置数据 → 真实文件上传解析，页面骨架跑通

- 基于 `demo_final_v5.html` 定稿布局
- Config 上传：解析 `config_data`，提取字段定义（title, valueType, options, dependency, columns）
- Config 解析器：处理 depend/form_list 的嵌套 columns 结构，展平为子字段
- JSONL 上传：FileReader 逐行解析，支持多文件，显示文件名+条数
- 解析进度条（大文件）
- 字段列表从实际 config 动态生成手风琴
- **验证：** 上传任意一套 sample config → 左侧正确渲染字段列表

### Step 2：核心分析引擎（radio/checkbox/textarea）
**目标：** 最常用的控件类型能跑通真实分析

- 数据提取：从 JSONL 的 `labels[].result` 中按 `dataIndex` 提取值
- Model 选择：检测 labels 中的 model 列表，支持选择分析哪些 model
- radio 分析：遍历数据统计各选项值的计数 + 百分比，结合 options 映射 label
- checkbox 分析：多选值展开，统计各选项 + 组合分布
- textarea 分析：统计非空率、平均字数、最大字数
- 生成 ECharts 饼图 + 柱状图
- 多文件对比：按上传文件分组统计，生成对比表格
- **验证：** 上传 config_IF + 数据 → 能看到真实的偏好分布

### Step 3：组合控件 + 高级控件
**目标：** depend/form_list 子字段分析 + 特殊控件类型

- depend 子字段展开：进入 `result.dataIndex` 对象内部，按子字段的 dataIndex 提取值
- form_list 子字段展开：数组内每个对象的子字段分别统计
- text_label 分析：统计 tagId 分布，覆盖率
- responses_ranking 分析：
  - 从数据中提取排序结果
  - 计算平均排名、各位次分布
  - 生成堆叠柱状图 + 胜率矩阵
- image_annotation 分析：
  - 统计有标注率、总框数、平均每条框数
  - 解析 tag 值分布
- **验证：** 上传 config_numcount → depend 子字段独立分析；上传 config_fc拉框 → 拉框统计

### Step 4：Model 映射
**目标：** 支持打乱顺序的偏好评测场景

- JSONL 解析时提取 `responses[].model`，建立每条记录的位置→model映射
- Model 映射面板：显示检测到的 model 列表 + 开关
- 映射逻辑：
  - 扫描选项 label，识别 `回复N` / `res_N` 模式
  - 统计时按每条记录的 responses 顺序，将位置引用翻译为真实 model 名
  - 聚合到真实 model 维度
- 结果展示：映射后的分布（主视图） + 原始分布（折叠可查看）
- 支持 2+ model
- **验证：** 上传 config_RL人工评测 + RL数据 → 开启映射后看到 slime vs 100b 的真实偏好

### Step 5：优化 & 打磨
**目标：** 生产可用

- 拖拽上传支持
- 样式细节打磨
- 交互优化（图表联动、hover 提示）
- 大文件性能优化（Web Worker）
- 错误处理（格式不对、字段缺失等友好提示）
- 导出功能（CSV / 截图）—— 按需
- 按 tagger_id 分组统计 —— 按需

## visibleRule 规则

| visibleRule | 含义 |
|-------------|------|
| `1-0-0` | 只在第一个回复显示 |
| `2-0-0` | 只在最后一个回复显示 |
| `0-0-0` | 在每个回复都显示 |

## 已确认 & 已完成

- [x] visibleRule 规则 ✅
- [x] 布局方案 ✅ 左右分栏+手风琴
- [x] 排序控件分析方式 ✅ 平均排名+堆叠柱状图+胜率矩阵
- [x] 拉框标注分析方式 ✅ 基础统计+Tag分布
- [x] 选项展示方式 ✅ 换行列出每个选项，依赖用「」标记
- [x] Model 映射方案 ✅ 始终显示面板，用户自主启用，支持多model
- [x] 模型汇总看板 ✅ 自动检测偏好/存在性指标，按模型聚合
- [x] 导出功能 ✅ PNG截图 + CSV下载（字段分析/模型汇总各自支持）
- [x] 多人标注一致性 ✅ Kappa系数 + 一致率 + 分歧分布 + 标注员对比
- [x] Config双格式兼容 ✅ config_data + templates
- [x] visibleRule自动过滤 ✅ 跳过默认填充数据
- [x] 字段搜索/筛选 ✅ 搜索框 + 类型标签
- [x] 多文件对比增强 ✅ 分组柱状图 + 文本类文件对比表格
- [x] 模型汇总兼容性 ✅ 放宽检测 + 3model支持

### 可选的未来改进
- [ ] 大文件性能优化（Web Worker + 图表懒加载）
- [ ] 更多模型汇总边界场景（4+ model、非关键词选项）

### 未支持的控件类型（按需补充）

| 控件 | 数据格式 | 可做的分析 | 优先级 |
|------|---------|-----------|--------|
| PDF转MD编辑器 | object（url + pagesMD + list） | 复杂结构，需定制 | 低 |
| 字符串转JSON / JSON编辑器 | JSON（结构不固定） | 结构不固定，难做通用分析 | 低 |
| 已上传文件列表 | array of objects（含 url/name/prefix） | 上传数量统计、文件类型分布、非空率 | 低 |
| 树选择 | string（如"水果-香蕉"） | 当前当 text 处理，可按"-"拆分做层级分布 | 低 |
| 时分秒 | string（如"1:30:19"） | 当前当 text 处理，可解析为秒数做均值/分布 | 低 |
| 链接 | array of strings | 当前只统计非空率，可加链接数量统计 | 低 |

### 平台集成（待调研）

**目标：** 将分析工具集成到标注平台 https://annot.aminer.cn/ ，选任务 → 选日期区间 → 直接分析，免去手动下载导出文件。

**方式 A：嵌入平台内部**
- 后端直接查数据库拿 config 和数据
- 需要平台开发团队配合

**方式 B：通过 API 独立对接**
- 分析工具独立部署，通过 API 拉取数据
- 需要平台提供 API（任务列表、config、按日期查数据）

**待确认：**
- [ ] 平台是否有 API / API 文档
- [ ] 是否有开发权限
- [ ] 认证方式（token / cookie / OAuth）
- [ ] 目标用户范围（个人 / 团队）

## 模型汇总看板（index_v2.html）

### 功能说明
在右侧内容区顶部加 tab 切换：「字段分析」和「模型汇总」。
- 字段分析：现有功能（选字段、看分布）
- 模型汇总：自动检测偏好/存在性字段，展示汇总表+柱状图

### 指标自动检测

**问题存在性字段（detectIssueField）：**
选项同时包含以下两组关键词：
- 无问题组：均不/均无/都正确/都不存在/都没/都无
- 有问题组：均有/均存在/都不正确/都有/都存在/都错
- 或含交叉模式：1正确2不正确 / 1存在2不存在

**偏好字段（detectPrefField）：**
选项同时包含：X好/X更好/X优/X胜（X=1和2），或含"X优于Y"

**平局识别：** 无偏好/无偏/tie/差不多/相同/持平/一样/无差

### 汇总内容
- 概览统计：数据条数、模型数量、评测维度
- 问题存在性表格：每个model在每个维度上"存在问题"的数量和占比 + 柱状图
- 偏好胜率表格：每个model在每个维度上的胜率（胜/平/负） + 柱状图

### Config格式兼容
- `{config_data: [...]}` — 标准格式
- `{templates: [{template_body: [...]}]}` — 多模板格式（取字段最多的template）

### 已改进（2026-05-26）
- [x] detectIssueField 放宽到 2 个选项
- [x] detectPrefField 扩展更多关键词模式（更优、胜出等）
- [x] parsePrefMappingSummary 支持 entity3Win（3个model）
- [x] 聚合逻辑从 isFirst 二分改为按位置索引匹配（pos 0/1/2）

### 可选的未来改进
- 选项文字完全不含数字的对比（如"A胜/B胜"）
- 4个以上model的对比
- 不通过responses确定模型的场景
