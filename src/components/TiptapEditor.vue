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
    <TiptapControlGroup :editor="editor" />
    <EditorContent class="editor-content" :editor="editor" />
  </div>
</template>

<style lang="css" scoped>
.editor {
  @apply border p-2 rounded;
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
