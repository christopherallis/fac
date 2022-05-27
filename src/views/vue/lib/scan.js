
class Scanner {
    constructor() {
        this.debounce = 0
        this.message = ""
    }

    onDecode(result) {
        console.log(result)
    }

    onKeyDown(e) {
        const t = Date.now()
        if (t - this.debounce > 100) {
            message = ""
        }
        debounce = t
        if (e.key == "Enter"){
            onDecode(message)
            debounce = 0
            message = ""
        }
        else if (e.key.length == 1) message += e.key

    }

    

    onMounted(() => {
        window.addEventListener('keydown',onKeyDown)
    })
    onUnmounted(()=> {
        window.removeEventListener('keydown', onKeyDown)
    })
}

