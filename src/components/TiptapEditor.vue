<script setup lang="ts">
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

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
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'text-sm prose prose-truegray xl:text-base focus:outline-none',
        // class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
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
        <button :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()">
          <icon-undo />
        </button>
        <button :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()">
          <icon-redo />
        </button>
        <ADivider direction="vertical" />
        <button :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
          <icon-h1 />
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
          <icon-h2 />
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
          <icon-h3 />
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
          <icon-h4 />
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
          <icon-h5 />
        </button>
        <button :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
          <icon-h6 />
        </button>
        <button :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()">
          <div class="i-carbon-paragraph" />
        </button>
        <ADivider direction="vertical" />
        <button :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
          <icon-bold />
        </button>
        <button :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
          <icon-italic />
        </button>
        <button :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
          <icon-strikethrough />
        </button>
        <button :class="{ 'is-active': editor.isActive('highlight') }" @click="editor.chain().focus().toggleHighlight().run()">
          <icon-highlight />
        </button>
        <button :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
          <icon-unordered-list />
        </button>
        <button :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
          <icon-ordered-list />
        </button>
        <button :class="{ 'is-active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
          <icon-code />
        </button>
        <button :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">
          <icon-quote />
        </button>
        <ADivider direction="vertical" />
        <button :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }" @click="editor.chain().focus().setTextAlign('left').run()">
          <icon-align-left />
        </button>
        <button :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" @click="editor.chain().focus().setTextAlign('center').run()">
          <icon-align-center />
        </button>
        <button :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" @click="editor.chain().focus().setTextAlign('right').run()">
          <icon-align-right />
        </button>

        <ADivider direction="vertical" />

        <button :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' }) }" @click="editor.chain().focus().setColor('#958DF1').run()">
          Purple
        </button>
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
.button-group button.is-active {
  @apply bg-purple text-white;
}
.button-group button {
  @apply bg-gray-2 text-black rounded border-none text-inherit text-0.875rem font-bold leading-1.15 m-none py-0.375rem px-0.625rem transition-all duration-200 ease-in-out;
}
/* .editor-content {
  all: initial;
}
.editor-content :deep(*) {
  all: unset;
} */
.editor-content :deep(.tiptap) {
  @apply p-2;
}
/* .editor-content :deep(.tiptap &:first-child) {
  @apply mt-0;
} */
/*
.editor-content :deep(.tiptap ul, ) {
  @apply px-1rem mx-1.25rem mt-1rem mb-0.4rem;
}
.editor-content :deep(.tiptap ol) {
  @apply px-1rem mx-1.25rem mt-1rem mb-0.4rem;
}

.editor-content :deep(.tiptap ul li p, .tiptap ol li p) {
  @apply mt-0.25em mb-0.25em;
}

.editor-content
  :deep(
    .tiptap h1,
    .tiptap h2,
    .tiptap h3,
    .tiptap h4,
    .tiptap h5,
    .tiptap h6
  ) {
  @apply leading-1.1 mt-2.5rem text-pretty;
}

.editor-content :deep(.tiptap h1, .tiptap h2, ) {
  @apply mt-3.5rem mb-1.5rem;
}

.editor-content :deep(.tiptap h1) {
  @apply text-1.4rem;
}
.editor-content :deep(.tiptap h2) {
  @apply text-1.2rem;
}
.editor-content :deep(.tiptap h3) {
  @apply text-1.1rem;
}
.editor-content :deep(.tiptap h3, .tiptap h4, .tiptap h5, .tiptap h6) {
  @apply text-1rem;
}
.editor-content :deep(.tiptap code) {
  @apply px-1.5 py-0.5 rounded bg-gray-5 text-black font-mono text-0.8rem;
}
.editor-content :deep(.tiptap pre) {
  @apply bg-black rounded text-white font-mono mx-1.5rem px-1rem py-0.75rem;
}
.editor-content :deep(.tiptap pre code) {
  @apply bg-none rounded text-inherit text-0.8rem p-0;
}
.editor-content :deep(.tiptap blockquote) {
  @apply my-1.5rem pl-1rem border-l-3px border-solid border-gray-3;
}
.editor-content :deep(.tiptap hr) {
  @apply border-none border-t-1px border-solid border-gray-2 my-2rem;
} */
</style>
