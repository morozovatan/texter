const App = {
    data: () => ({
        title: 'Texter',
        titlePlaceholder: 'Enter the title...',
        editorPlaceholder: '... and body',
        titleValue: '',
        bodyValue: '',
        notes: [],
        editorIsActive: false,

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
            if (this.titleValue !== '' && this.bodyValue !== '') {
                this.notes.push({ title: this.titleValue, body: this.bodyValue, isOpen: false })
                this.titleValue = ''
                this.bodyValue = ''
            }
        },
        openNote(i) {
            this.notes[i].isOpen = !this.notes[i].isOpen;
        },
        removeNote(i) {
            this.notes.splice(i, 1)
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')