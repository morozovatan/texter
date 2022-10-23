const App = {
    data: () => ({
        title: 'Texter',
        myPlaceholder: 'Enter the title...',
        inputValue: '',
        notes: [],
        editorIsActive: false
    }
    ),
    methods: {
        openEditor() {
            this.editorIsActive = !this.editorIsActive
        },
        addNewNote() {
            if (this.inputValue !== '') {
                this.notes.push(this.inputValue)
                this.inputValue = ''
            }
        },
        removeNote(i) {
            this.notes.splice(i, 1)
        }
    }
}

const app = Vue.createApp(App)
app.mount('#app')