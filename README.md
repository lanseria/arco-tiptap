# Arco Tiptap Editor Demo

在线预览: [Demo](https://arco-tiptap.netlify.app/)

为了更好的使用在您的项目中，您参考项目中的代码复制粘贴即可，这样的作法可能更适合您

你可能注意到，我并没有使用 `AColorPicker`组件，因为会引发一些bug

## 迁移至项目需要注意不要遗漏

- 迁移 unocss.config.ts

```
presetTypography(),
```

```
  safelist: [
    'text-sm',
    'prose',
    'dark:prose-invert',
    'max-w-full',
    'prose-truegray',
    'focus:outline-none',
  ],
```

## 目前的问题

- 文字字体未做(需帮助)
- 图片大小无法控制(需帮助)
- 无表格功能(暂时)

> 与 unocss 与 arco.design 加上 tiptap 实现的富文本功能

## 文档结构

- **Document**: 定义编辑器的基础文档结构。
- **Paragraph**: 定义段落。
- **FontSize**: 定义字体大小。
- **Heading**: 定义标题。
- **Blockquote**: 定义引用块。

## 列表

- **OrderedList**: 有序列表。
- **BulletList**: 无序列表。
- **ListItem**: 列表项。

## 文本样式

- **Bold**: 加粗文本。
- **Italic**: 斜体文本。
- **Strike**: 删除线文本。
- **Underline**: 下划线文本。
- **Highlight**: 高亮文本。
- **Color**: 改变文本颜色。
- **TextStyle**: 允许应用自定义的文本样式。

## 图像

- **Image**: 插入图片。

## 对齐方式

- **TextAlign**: 文字对齐（左对齐、右对齐、居中对齐）。

## 占位符

- **Placeholder**: 显示占位符文本。

## 历史记录

- **History**: 撤销和重做功能。

## 光标

- **Dropcursor**: 拖放光标。
