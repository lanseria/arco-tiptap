import { Mark, mergeAttributes } from '@tiptap/core'

const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*=font-size]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize.replace('px', ''),
        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {}
          }
          return {
            style: `font-size: ${attributes.size}px`,
          }
        },
      },
    }
  },

  addCommands() {
    return {
      setFontSize: size => ({ chain }) => {
        return chain().setMark(this.name, { size }).run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().unsetMark(this.name).run()
      },
    }
  },
})

export default FontSize
