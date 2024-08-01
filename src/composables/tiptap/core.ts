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

import { FontSize } from '~/composables/tiptap/FontSize'

export function useCore() {
  const editorProps = {
    attributes: {
      class: 'text-sm prose dark:prose-invert max-w-full prose-truegray focus:outline-none',
    },
  }
  const extensions = [
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
    FontSize,
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
  ]
  return {
    extensions,
    editorProps,
  }
}
