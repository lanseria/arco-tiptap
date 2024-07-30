<script setup lang="ts">
import TextAlign from '@tiptap/extension-text-align'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Image from '@tiptap/extension-image'

import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

import History from '@tiptap/extension-history'
import Dropcursor from '@tiptap/extension-dropcursor'

import { Editor, EditorContent } from '@tiptap/vue-3'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue'])
const editor = shallowRef<Editor>()
const textStyleColor = computed(() => {
  if (editor.value) {
    if (editor.value.getAttributes('textStyle').color) {
      return editor.value.getAttributes('textStyle').color
    }
  }
  return '#000000'
})
function handleInsertImage() {
  if (editor.value)
    editor.value.chain().focus().setImage({ src: 'https://placehold.co/800x400/6A00F5/white' }).run()
}

function handleInsertImageUrl() {
  // eslint-disable-next-line no-alert
  const text = prompt('请粘贴图片地址')
  if (text !== null) {
    if (editor.value)
      editor.value.chain().focus().setImage({ src: text }).run()
  }
}
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      //
      Document,
      Paragraph,
      Text,
      Blockquote,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      ListItem,
      Image,

      // marks
      Bold,
      Italic,
      Strike,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: '写些什么 …',
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
      //
      History,
      Dropcursor,
    ],
    editorProps: {
      attributes: {
        class: 'text-sm prose dark:prose-invert max-w-full prose-truegray focus:outline-none',
      },
    },
    onUpdate: () => {
      if (editor.value)
        emits('update:modelValue', editor.value.getHTML())
    },
  })
  watchEffect(() => {
    if (editor.value) {
      const isSame = editor.value.getHTML() === props.modelValue
      if (isSame) {
        return
      }
      editor.value.commands.setContent(props.modelValue, true)
    }
  })
})
onBeforeUnmount(() => {
  if (editor.value)
    editor.value.destroy()
})
</script>

<template>
  <div v-if="editor" class="editor">
    <div class="control-group">
      <div class="button-group">
        <ATooltip content="撤销">
          <AButton :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">
            <template #icon>
              <icon-undo />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="重做">
          <AButton :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">
            <template #icon>
              <icon-redo />
            </template>
          </AButton>
        </ATooltip>

        <ADivider direction="vertical" />

        <ATooltip content="一级标题">
          <AButton :type="editor.isActive('heading', { level: 1 }) ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            <template #icon>
              <icon-h1 />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="二级标题">
          <AButton :type="editor.isActive('heading', { level: 2 }) ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            <template #icon>
              <icon-h2 />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="三级标题">
          <AButton :type="editor.isActive('heading', { level: 3 }) ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            <template #icon>
              <icon-h3 />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="段落">
          <AButton :type="editor.isActive('paragraph') ? 'primary' : 'secondary'" @click="editor.chain().focus().setParagraph().run()">
            <template #icon>
              <div class="i-carbon-paragraph" />
            </template>
          </AButton>
        </ATooltip>

        <ADivider direction="vertical" />

        <ATooltip content="加粗">
          <AButton :type="editor.isActive('bold') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleBold().run()">
            <template #icon>
              <icon-bold />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="斜体">
          <AButton :type="editor.isActive('italic') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleItalic().run()">
            <template #icon>
              <icon-italic />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="删除线">
          <AButton :type="editor.isActive('strike') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleStrike().run()">
            <template #icon>
              <icon-strikethrough />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="下划线">
          <AButton :type="editor.isActive('underline') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleUnderline().run()">
            <template #icon>
              <icon-underline />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="高亮">
          <AButton :type="editor.isActive('highlight') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleHighlight().run()">
            <template #icon>
              <icon-highlight />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="无序列表">
          <AButton :type="editor.isActive('bulletList') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleBulletList().run()">
            <template #icon>
              <icon-unordered-list />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="有序列表">
          <AButton :type="editor.isActive('orderedList') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleOrderedList().run()">
            <template #icon>
              <icon-ordered-list />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="引用">
          <AButton :type="editor.isActive('blockquote') ? 'primary' : 'secondary'" @click="editor.chain().focus().toggleBlockquote().run()">
            <template #icon>
              <icon-quote />
            </template>
          </AButton>
        </ATooltip>

        <ADivider direction="vertical" />

        <ATooltip content="左对齐">
          <AButton :type="editor.isActive({ textAlign: 'left' }) ? 'primary' : 'secondary'" @click="editor.chain().focus().setTextAlign('left').run()">
            <template #icon>
              <icon-align-left />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="居中">
          <AButton :type="editor.isActive({ textAlign: 'center' }) ? 'primary' : 'secondary'" @click="editor.chain().focus().setTextAlign('center').run()">
            <template #icon>
              <icon-align-center />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="右对齐">
          <AButton :type="editor.isActive({ textAlign: 'right' }) ? 'primary' : 'secondary'" @click="editor.chain().focus().setTextAlign('right').run()">
            <template #icon>
              <icon-align-right />
            </template>
          </AButton>
        </ATooltip>

        <ADivider direction="vertical" />
        <ATooltip content="字体颜色">
          <TiptapColorPicker
            :value="textStyleColor"
            @input="editor.chain().focus().setColor($event.target.value).run()"
          />
        </ATooltip>

        <ADivider direction="vertical" />

        <ATooltip content="插入图片">
          <AButton type="secondary" @click="handleInsertImage">
            <template #icon>
              <IconImage />
            </template>
          </AButton>
        </ATooltip>
        <ATooltip content="插入图片链接">
          <AButton type="outline" @click="handleInsertImageUrl">
            <template #icon>
              <IconImage />
            </template>
          </AButton>
        </ATooltip>
      </div>
    </div>
    <EditorContent class="editor-content" :editor="editor" />
  </div>
</template>

<style lang="css" scoped>
.editor {
  @apply border p-2 rounded;
}
.control-group {
  @apply border-b-1px pb-2;
}
.button-group {
  @apply flex gap-2 flex-wrap;
}
.editor-content :deep(.tiptap) {
  @apply p-2;
}
.editor-content :deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
