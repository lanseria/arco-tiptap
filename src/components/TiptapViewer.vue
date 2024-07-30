<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Blockquote from '@tiptap/extension-blockquote'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const viewer = shallowRef<Editor>()

onMounted(() => {
  viewer.value = new Editor({
    content: props.content,
    editable: false, // Set the editor to be non-editable
    extensions: [
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
      Bold,
      Italic,
      Strike,
      Highlight,
      Underline,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class: 'text-sm prose dark:prose-invert max-w-full prose-truegray',
      },
    },
  })
  watchEffect(() => {
    if (viewer.value) {
      const isSame = viewer.value.getHTML() === props.content
      if (isSame) {
        return
      }
      viewer.value.commands.setContent(props.content, true)
    }
  })
})
</script>

<template>
  <div v-if="viewer" class="viewer">
    <EditorContent class="viewer-content" :editor="viewer" />
  </div>
</template>

<style lang="css" scoped>
.viewer {
  @apply border rounded w-1000px;
}
.viewer-content {
  @apply p-2;
}
</style>
