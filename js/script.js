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
        makeBold() {
            const b = document.createElement('b')
            //document.getSelection().surroundContents(b)
            document.getSelection().getRangeAt(0).surroundContents(b)

            console.log(document.getSelection().getRangeAt(0))
        },
        addNewNote() {
            // if (this.titleValue !== '' && this.bodyValue !== '') {
            //     this.notes.push({ title: this.titleValue, body: this.bodyValue, isOpen: false })
            //     this.titleValue = ''
            //     this.bodyValue = ''
            // }

            this.notes.push({ title: this.titleValue, body: tinymce.get('note-body').getContent() })
            // const domNotes = document.querySelector('.notes').querySelectorAll('li')
            // console.log(domNotes)
            // domNotes[i].querySelector('note-body').insertAdjacentHTML('afterbegin', notes.body[i])

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