<script setup lang="ts">
const content = ref(`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `)
</script>

<template>
  <div>
    <TiptapEditor v-model="content" />
    <nav mt-6 inline-flex gap-2 text-xl>
      <button icon-btn @click="toggleDark()">
        <div i-carbon-sun dark:i-carbon-moon />
      </button>
      <!--
      <a
        i-carbon-logo-github icon-btn
        rel="noreferrer"
        href="https://github.com/lanseria/arco-uno-basic-template"
        target="_blank"
        title="GitHub"
      /> -->
    </nav>
  </div>
</template>
