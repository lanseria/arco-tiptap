<script setup lang="ts">
const content = ref(`
        <h2> Hi there, </h2> <p> this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists: </p> <ul> <li> That’s a bullet list with one … </li> <li> … or two list items. </li> </ul> <p> I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too. </p> <blockquote> Wow, that’s amazing. Good work, boy! 👏 <br /> — Mom </blockquote>
        <h2> 嗨， </h2> <p> 这是一个关于<strong>Tiptap</strong>的基本示例。当然，它具备您在文本编辑器中预期的各种基本文本样式。但等到您看到列表时，就会惊叹不已： </p> <ul> <li> 这是一个带有一个……的项目符号列表。 </li> <li> ……或者两个列表项。 </li> </ul> <p> 我知道，我知道，这太令人印象深刻了。但这只是冰山一角。尝试一下，点击一下吧。别忘了查看其他示例。 </p> <blockquote> 哇，太棒了。好样的，孩子！👏 <br /> — 妈妈 </blockquote>
      `)

function handleOpen(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-6 inline-flex cursor-default text-2xl font-300">
      <div class="logo-with-text" @click="handleOpen('https://tiptap.dev')">
        <img class="inline-block h-18 w-18" src="/favicon.png">
        <span class="mt--2 text-gray5">Tiptap</span>
      </div>
      <div class="icon-plus" />
      <div class="logo-with-text" @click="handleOpen('https://arco.design')">
        <img class="inline-block h-18 w-18" src="/arco.design.png">
        <span class="mt--2 text-blue5">Arco.Design</span>
      </div>
      <div class="icon-plus" />
      <div class="logo-with-text" @click="handleOpen('https://vuejs.org')">
        <img class="inline-block h-18 w-18" src="/vue.js.png">
        <span class="mt--2 text-green5">Vue.js</span>
      </div>
      <div class="icon-plus" />
      <div class="logo-with-text" @click="handleOpen('https://unocss.dev/')">
        <img class="inline-block h-18 w-18" src="/unocss.svg">
        <span class="mt--2 text-gray5">unocss</span>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div>Tiptap Editor</div>
      <TiptapEditor v-model="content" />
      <div>Tiptap Viewer</div>
      <TiptapViewer :content="content" />
    </div>
    <nav mt-6 inline-flex gap-2 text-xl>
      <button icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>

      <a
        i-carbon-logo-github icon-btn
        rel="noreferrer"
        href="https://github.com/lanseria/arco-tiptap"
        target="_blank"
        title="GitHub"
      />
    </nav>
  </div>
</template>

<style lang="css" scoped>
.logo-with-text {
  @apply flex flex-col transform cursor-pointer transition-all-500 children:mx-auto hover:scale-110;
}
.icon-plus {
  @apply text-3xl text-gray4 mx-4 my-auto i-carbon-add transform transition-all-500 hover:rotate-135;
}
</style>
