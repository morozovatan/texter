const App = {
    data: () => ({
        title: 'Texter',
        titlePlaceholder: 'Enter the title...',
        editorPlaceholder: '... and body',
        searchPlaceholder: 'Looking for something?',
        titleValue: '',
        notes: [],
        editorIsActive: false,
        wantedValue: ''
    }
    ),
    methods: {
        openEditor() {
            this.editorIsActive = true
        },
        closeEditor() {
            this.editorIsActive = false
        },
        addNewNote() {
            if (this.titleValue !== '' && tinymce.activeEditor.getContent() !== '') {
                this.notes.push({ title: this.titleValue, body: tinymce.activeEditor.getContent(), isOpen: false })
                this.titleValue = ''
                tinymce.activeEditor.setContent('')
            }
        },
        openNote(i) {
            this.notes[i].isOpen = !this.notes[i].isOpen
        },
        editNote(i) {
            this.openEditor()
            this.titleValue = this.notes[i].title
            tinymce.activeEditor.setContent(this.notes[i].body)
            this.removeNote(i)
        },
        removeNote(i) {
            this.notes.splice(i, 1)
        }
    },
    computed: {
        computedNotes() {
            if (this.wantedValue !== '') {
                return this.notes.filter(note => note.title.includes(this.wantedValue))
            }
            return this.notes

        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')