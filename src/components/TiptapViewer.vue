<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { useCore } from '~/composables/tiptap/core'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
})

const viewer = shallowRef<Editor>()
const { extensions, editorProps } = useCore()
onMounted(() => {
  viewer.value = new Editor({
    content: props.content,
    editable: false, // Set the editor to be non-editable
    extensions,
    editorProps,
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
