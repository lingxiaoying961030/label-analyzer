# PROGRESS.md - 开发进度

## 状态：✅ 已完成（index_final.html 为最终版）

### 2026-05-20
- [x] 创建项目目录
- [x] 分析 config 文件格式（标注平台导出）
- [x] 整理完整控件类型表（26 种 valueType + 返回值格式）
- [x] 编写设计文档 DESIGN.md
- [x] 制作简易 demo（demo.html）

### 2026-05-21 ~ 2026-05-24
- [x] Step 1：基础框架（上传、解析、选择）
- [x] Step 2：核心分析引擎（radio/checkbox/textarea + 图表）
- [x] Step 3：组合控件 + 高级控件（depend/form_list/text_label/image_annotation/ranking）
- [x] Step 4：Model 映射（responses 随机打乱场景）
- [x] Step 5：优化 & 打磨（拖拽上传、错误处理、UI 细节）
- [x] 模型汇总看板（index_v2.html）— 自动检测偏好/存在性指标，按模型聚合

### 2026-05-25 ~ 2026-05-26
- [x] Config 双格式兼容（config_data + templates）
- [x] visibleRule 自动过滤（跳过默认填充数据）
- [x] 多人标注一致性分析（Kappa + 一致率 + 分歧分布 + 各标注员对比）
- [x] 导出功能（PNG 截图 + CSV 下载，字段分析/模型汇总各自支持）
- [x] 字段搜索/筛选（搜索框 + 类型标签）
- [x] 多文件对比增强（分组柱状图 + 文本类文件对比表格）
- [x] 模型汇总兼容性增强（放宽检测规则 + 3 model 支持 + 按位置索引匹配）
- [x] Bug 修复：单人标注误显多人一致性分析
- [x] fieldProps.options 兼容（options 存放在不同位置的 config 都能正确读取）
- [x] 顶层 radio 字段也支持 detectIssueField（之前只有 depend 子字段检测）
- [x] detectIssueField 支持"是/否"模式（结合 title 判断正负向）
- [x] 字段匹配校验增强（部分匹配也弹 toast 提醒）
- [x] 顶部固定布局（tab 栏 + 导出按钮不随页面滚动）
- [x] 部署上线（Netlify Drop）

### 部署信息
- **GitHub 仓库**：https://github.com/lingxiaoying961030/label-analyzer
- **线上访问**：通过 Netlify Drop 部署（盈盈有链接）
- **部署文件夹**：`/Users/lingxiaoying/projects/label-analyzer/deploy/index.html`
- **更新方式**：修改 index_final.html → 复制到 deploy/index.html → Netlify 后台重新拖拽部署
- **⚠️ 待办**：盈盈需要 claim Netlify 站点（否则 30 天过期），可选绑定 GitHub 自动部署

### 文件版本清单

| 文件 | 说明 |
|------|------|
| `index.html` | 原始正式版（Step 1-5，无模型汇总） |
| `index_v2.html` | + 模型汇总 tab |
| `index_v3.html` | + 双格式 + visibleRule + 多人标注 + 导出 |
| `demo_features.html` | + 字段搜索 + 多文件对比增强 + 模型兼容 + 单人标注修复 |
| `demo_export.html` | 导出功能独立 demo |
| `demo_loading.html` | loading 动画实验版（未合入） |
| **`index_final.html`** | ✅ **最终版**（= demo_features.html） |

### 关键设计决策
- **通用化**：不硬编码 valueType 名称，按返回值实际数据格式自动推断分析方式
- **config 驱动**：标注平台导出的 config 直接用，不需要手写
- **纯前端单文件 HTML**：ECharts + html2canvas，不需要后端
- **Model 名称动态提取**：从 JSONL 数据中自动读取，不写死
- **visibleRule 过滤在 extractValues 层**：单一过滤点，所有下游函数自动受益
- **多人标注判断**：按每条记录内的 tagger 数，而非全局 tagger 数
- **Kappa "Slight" → "极差"**：<0 和 0-0.20 都映射为"极差"
- **导出 CSV 带 BOM**：\uFEFF 前缀，Excel 打开中文不乱码

### 可选的未来改进
- 大文件性能优化（Web Worker + 图表懒加载，万条以上场景）
- 更多模型汇总边界场景（选项不含数字关键词、4+ model）
