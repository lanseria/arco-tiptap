import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import { cwd } from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { loadEnv } from 'vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = cwd()
  const env = loadEnv(mode, root)
  return {
    server: {
      host: env.VITE_HOST,
      port: +env.VITE_PORT,
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
    },
    build: {
      sourcemap: true,
    },
    plugins: [
      VueRouter(),
      vue(),

      vueJsx(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        resolvers: [ArcoResolver()],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: [
          './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            resolveIcons: true,
            sideEffect: false,
          }),
        ],
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
    ],

    optimizeDeps: {
      include: [
        '@arco-design/web-vue/es/locale/lang/zh-cn',
        '@vueuse/core',
        '@tiptap/vue-3',
        '@tiptap/extension-text-align',
        '@tiptap/extension-blockquote',
        '@tiptap/extension-document',
        '@tiptap/extension-paragraph',
        '@tiptap/extension-heading',
        '@tiptap/extension-text',
        '@tiptap/extension-ordered-list',
        '@tiptap/extension-bullet-list',
        '@tiptap/extension-image',
        '@tiptap/extension-bold',
        '@tiptap/extension-italic',
        '@tiptap/extension-strike',
        '@tiptap/extension-color',
        '@tiptap/extension-text-style',
        '@tiptap/extension-list-item',
        '@tiptap/extension-highlight',
        '@tiptap/extension-underline',
        '@tiptap/extension-placeholder',
        '@tiptap/extension-history',
        '@tiptap/extension-dropcursor',
        '@tiptap/core',

      ],
    },

  }
}
