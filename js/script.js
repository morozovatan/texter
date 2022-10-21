const App = {
    data: () => ({
        title: 'Texter',
        myPlaceholder: 'Start texting...',
        inputValue: '',
        notes: []
    }
    ),
    methods: {
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