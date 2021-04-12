export class ScrollBottomListener {
    constructor(cb) {
        this.isLoading = false
        this.offset =200
        this.cb = cb
    }

    scrollToBottom() {
        const raw = document.documentElement || document.body
        const wh = raw.clientHeight,
            dh = raw.scrollHeight,
            sh = raw.scrollTop
        if (wh + sh >= dh - this.offset && !this.isLoading) {
            this.isLoading = true
            this.cb().then(() => {
                this.isLoading = false
            }).catch(e => {
            })
        }
    }

    registerListener() {
        window.addEventListener("scroll", this.scrollToBottom.bind(this));
    }

    removeListener() {
        window.removeEventListener('scroll', this.scrollToBottom.bind(this));
    }
}
