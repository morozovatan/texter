<template>
  <!-- <Editor
    id="note-body"
    :init="{
      menubar: false,
      toolbar:
        'undo redo | bold italic | alignleft aligncenter alignright alignjustify',
      }"
    :placeholder="editorPlaceholder"
    value:modelValue
    @input="$emit('update:modelValue', $event.target.value)"
    
  /> -->
  <textarea name="" :placeholder="editorPlaceholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"></textarea>
<!-- <editor-content :editor="editor" /> -->
</template>

<script setup>
import {ref} from 'vue'
import Editor from "@tinymce/tinymce-vue"
// import { useEditor, EditorContent } from '@tiptap/vue-3'
// import StarterKit from '@tiptap/starter-kit'

// const editor = useEditor({
//   extensions: [
//         StarterKit,
//       ],
//   content: modelValue,
//   onUpdate: () => {
//      // HTML
//     $emit('update:modelValue', this.editor.getHTML())
//   },
// })

defineProps({
  modelValue: {
    type: String,
    default: '',
  }
})
//let modelValue = ref('')
const editorPlaceholder = "... and body";


// const we = watch((value)=> {
//   // HTML
//   const isSame = this.editor.getHTML() === value

//   // JSON
//   // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

//   if (isSame) {
//     return
//   }

//   this.editor.commands.setContent(value, false)
// })
  


defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Basic editor styles */
/* .ProseMirror > * + * {
    margin-top: 0.75em;
  }

  .ProseMirror code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
.content {
  padding: 1rem 0 0;
}

.content h3 {
    margin: 1rem 0 0.5rem;
  }

  .content pre {
    border-radius: 5px;
    color: #333;
  }

  .content code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color:#e9ecef;
    color: #495057;
  } */
  .card .editor-wrapper textarea {
  font-size: 100%;
  padding-left: 1rem;
  width: 100%;
  border: 1px solid black;
  height: 20rem;
}
</style>