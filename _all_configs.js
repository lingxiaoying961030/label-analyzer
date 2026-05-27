const ALL_CONFIGS = {
  "config_numcount": {
    name: "指令遵循评测集v3-数量统计annotate",
    file: "config_numcount.json",
    fields: [
      { dataIndex: "compliance", title: "遵循判断", valueType: "depend", visibleRule: "0-0-0",
        subFields: [
          { title: "检查项合理性判断", valueType: "radio", options: [{label:"合理",value:0},{label:"不合理",value:1}] },
          { title: "回复1检查项遵循判断", valueType: "radio", options: [{label:"遵循",value:0},{label:"不遵循",value:1}] },
          { title: "回复2检查项遵循判断", valueType: "radio", options: [{label:"遵循",value:0},{label:"不遵循",value:1}] }
        ]
      },
      { dataIndex: "quantity", title: "数量统计", valueType: "form_list", visibleRule: "0-0-0",
        subFields: [
          { title: "计数目标", valueType: "textarea" },
          { title: "回复1要求数量", valueType: "text" },
          { title: "回复2要求数量", valueType: "text" },
          { title: "回复1实际数量", valueType: "text" },
          { title: "回复2实际数量", valueType: "text" }
        ]
      },
      { dataIndex: "Note", title: "笔记", valueType: "textarea", visibleRule: "0-0-0", subFields: [] }
    ],
    models: ["judgement", "response"]
  },
  "config_logic": {
    name: "内部逻辑判定_annotate",
    file: "config_logic.json",
    fields: [
      { dataIndex: "response_conflict", title: "内部逻辑判断", valueType: "text_label", visibleRule: "0-0-0",
        subFields: [
          { title: "回复逻辑错误", valueType: "tag", options: [] },
          { title: "judgement判断", valueType: "tag", options: [] }
        ]
      },
      { dataIndex: "judgment_quality", title: "judgment质量判定", valueType: "checkbox", visibleRule: "1-0-0",
        options: [{label:"judgment分析无误",value:0},{label:"judgment分析错误",value:1},{label:"judgment分析遗漏",value:2}],
        subFields: []
      },
      { dataIndex: "Note", title: "笔记", valueType: "textarea_auto_height", visibleRule: "0-0-0", subFields: [] }
    ],
    models: ["judgement", "response"]
  },
  "config_IF": {
    name: "指令遵循评测集标注-偏好判断-annot",
    file: "config_IF.json",
    fields: [
      { dataIndex: "res1_compliance", title: "回复1检查项遵循判定", valueType: "radio", visibleRule: "1-0-0",
        options: [{label:"遵循",value:0},{label:"不遵循",value:1}], subFields: [] },
      { dataIndex: "res1_note", title: "回复1-note", valueType: "textarea", visibleRule: "1-0-0", subFields: [] },
      { dataIndex: "res2_compliance", title: "回复2检查项遵循判定", valueType: "radio", visibleRule: "2-0-0",
        options: [{label:"遵循",value:0},{label:"不遵循",value:1}], subFields: [] },
      { dataIndex: "res2_note", title: "回复2-note", valueType: "textarea", visibleRule: "2-0-0", subFields: [] },
      { dataIndex: "overall_preference", title: "整体指令遵循偏好", valueType: "radio", visibleRule: "2-0-0",
        options: [{label:"回复1更好",value:0},{label:"无偏好",value:1},{label:"回复2更好",value:2},{label:"跳过",value:3}], subFields: [] },
      { dataIndex: "Note", title: "笔记", valueType: "textarea", visibleRule: "0-0-0", subFields: [] }
    ],
    models: ["response1", "response2"]
  },
  "config_artifact": {
    name: "搭子artifacts美观度筛选",
    file: "config_artifact.json",
    fields: [
      { dataIndex: "combined", title: "组合标注", valueType: "depend", visibleRule: "0-0-0",
        subFields: [
          { title: "是否存在明显bug", valueType: "radio", options: [{label:"是",value:1},{label:"否",value:0}] },
          { title: "页面美观度（静态）", valueType: "radio", options: [{label:"1分-很差",value:1},{label:"2分-较差",value:2},{label:"3分-一般",value:3},{label:"4分-较好",value:4},{label:"5分-很好",value:5}] },
          { title: "页面美观度（交互/动态）", valueType: "radio", options: [{label:"1分-很差",value:1},{label:"2分-较差",value:2},{label:"3分-一般",value:3},{label:"4分-较好",value:4},{label:"5分-很好",value:5}] }
        ]
      }
    ],
    models: ["response"]
  },
  "config_judgementV2": {
    name: "judgement_V2_annotate",
    file: "config_judgementV2.json",
    fields: [
      { dataIndex: "response_error", title: "response是否存在错误", valueType: "radio", visibleRule: "2-0-0",
        options: [{label:"是",value:1},{label:"否",value:0}], subFields: [] },
      { dataIndex: "judgement_edit", title: "judgement判定和修改", valueType: "depend", visibleRule: "1-0-0",
        subFields: [
          { title: "judgement质量判定", valueType: "radio", options: [{label:"正确",value:0},{label:"错误",value:1}] },
          { title: "judgement修改", valueType: "draggable_md_editor", options: [] }
        ]
      },
      { dataIndex: "Note", title: "笔记", valueType: "textarea_auto_height", visibleRule: "0-0-0", subFields: [] },
      { dataIndex: "ref_links", title: "参考链接", valueType: "editable_link", visibleRule: "0-0-0", subFields: [] }
    ],
    models: ["judgement", "response"]
  },
  "config_体感测": {
    name: "20260104-标注员体感测-修bug",
    file: "config_体感测.json",
    fields: [
      { dataIndex: "model1_good", title: "model1的好note", valueType: "textarea", visibleRule: "1-0-0", subFields: [] },
      { dataIndex: "model1_bad", title: "model1_坏note", valueType: "textarea", visibleRule: "1-0-0", subFields: [] },
      { dataIndex: "model2_good", title: "model2的好note", valueType: "textarea", visibleRule: "2-0-0", subFields: [] },
      { dataIndex: "model2_bad", title: "model2的坏note", valueType: "textarea", visibleRule: "2-0-0", subFields: [] },
      { dataIndex: "preference", title: "偏好", valueType: "radio", visibleRule: "2-0-0",
        options: [{label:"model1更好",value:0},{label:"model2更好",value:1},{label:"差不多",value:2},{label:"都很差",value:3},{label:"模型有异常，跳过这轮评测",value:4}], subFields: [] }
    ],
    models: ["model1", "model2"]
  },
  "config_学科": {
    name: "学科感知code修改",
    file: "config_学科.json",
    fields: [
      { dataIndex: "judge", title: "判断是否一致", valueType: "depend", visibleRule: "0-0-0",
        subFields: [
          { title: "是否需要跳过", valueType: "radio", options: [{label:"是",value:0},{label:"否",value:1}] },
          { title: "是否正确", valueType: "radio", options: [{label:"是",value:1},{label:"否",value:0}], dependency: "当是否需要跳过=否时显示" },
          { title: "修改后的图片生成代码", valueType: "draggable_md_editor", dependency: "当是否正确=否时显示" }
        ]
      },
      { dataIndex: "screenshot", title: "修改后的图片", valueType: "screenshot", visibleRule: "0-0-0", subFields: [] },
      { dataIndex: "Note", title: "笔记", valueType: "textarea", visibleRule: "0-0-0", subFields: [] }
    ],
    models: ["response"]
  },
  "config_搜索偏好": {
    name: "搜索偏好0429",
    file: "config_搜索偏好.json",
    fields: [
      { dataIndex: "unable_to_judge", title: "无法判断", valueType: "depend", visibleRule: "2-0-0",
        subFields: [
          { title: "无法判断", valueType: "radio", options: [{label:"是",value:1},{label:"否",value:0}] },
          { title: "理由", valueType: "textarea", dependency: "当无法判断=是时显示" }
        ]
      },
      { dataIndex: "ranking", title: "排序", valueType: "responses_ranking", visibleRule: "2-0-0", subFields: [] },
      { dataIndex: "Note", title: "笔记", valueType: "textarea_auto_height", visibleRule: "0-0-0", subFields: [] },
      { dataIndex: "rubric1", title: "rubric分析（回复1）", valueType: "textarea_auto_height", visibleRule: "1-0-0", subFields: [] },
      { dataIndex: "rubric2", title: "rubric分析（回复2）", valueType: "textarea_auto_height", visibleRule: "2-0-0", subFields: [] },
      { dataIndex: "rubric3", title: "rubric分析（回复3）", valueType: "textarea_auto_height", visibleRule: "2-0-0", subFields: [] }
    ],
    models: ["response1", "response2", "response3"]
  }
};