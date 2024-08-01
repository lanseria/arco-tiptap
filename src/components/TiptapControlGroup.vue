<script lang="ts" setup>
import type { Editor } from '@tiptap/vue-3'
import type { PropType } from 'vue'

const props = defineProps({
  editor: {
    type: Object as PropType<Editor>,
    required: true,
  },
})

const textStyleColor = computed(() => {
  if (props.editor.getAttributes('textStyle').color) {
    return props.editor.getAttributes('textStyle').color
  }
  return '#000000'
})

const textFontSize = computed(() => {
  if (props.editor.getAttributes('textStyle').fontSize) {
    return props.editor.getAttributes('textStyle').fontSize
  }
  return 14
})
function handleInsertImage() {
  props.editor.chain().focus().setImage({ src: 'https://placehold.co/800x400/6A00F5/white' }).run()
}

function handleInsertImageUrl() {
  // eslint-disable-next-line no-alert
  const text = prompt('请粘贴图片地址')
  if (text !== null) {
    props.editor.chain().focus().setImage({ src: text }).run()
  }
}
function setColor(color: string) {
  props.editor.chain().focus().setColor(color).run()
}
function setFontSize(size: any) {
  props.editor.chain().focus().setFontSize(size).run()
}
</script>

<template>
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
      <ASelect class="w-80px" :model-value="textFontSize" :options="[12, 14, 16, 18, 20]" @change="setFontSize" />
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
          @input="setColor($event.target.value)"
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
</template>

<style lang="css" scoped>
.control-group {
  @apply border-b-1px p-2;
}
.button-group {
  @apply flex gap-2 flex-wrap;
}
</style>
