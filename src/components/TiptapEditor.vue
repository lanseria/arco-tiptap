<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useCore } from '~/composables/tiptap/core'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:modelValue'])
const editor = shallowRef<Editor>()
const { extensions, editorProps } = useCore()
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions,
    editorProps,
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
    <AScrollbar class="h-400px overflow-auto" outer-class="p-2">
      <EditorContent class="editor-content" :editor="editor" />
    </AScrollbar>
  </div>
</template>

<style lang="css" scoped>
.editor {
  @apply border rounded w-1000px;
}
.editor-content {
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
