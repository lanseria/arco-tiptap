<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
</script>

<template>
  <AConfigProvider
    :locale="zhCN"
  >
    <main font-sans p="x-4 y-10">
      <RouterView />
    </main>
  </AConfigProvider>
</template>
