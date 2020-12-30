export class JiuScrollBottom {
    constructor(offset = 50, infinite = false) {
        this.loading = false
        this.offset = offset
        this.infinite = infinite
    }

    scrollBottom(callback) {
        let t = document.documentElement.scrollTop;
        let h = document.documentElement.clientHeight;
        let xv = document.body.scrollHeight - this.offset;
        if (t + h >= xv && !this.loading) {
            this.loading = true;
            callback()
        }
        if (t + h < xv && this.infinite) this.loading = false
    }

    registerAddEventListener(callback) {
        window.addEventListener("scroll", this.scrollBottom.bind(this, callback), false);
    }

    removeEventListener() {
        window.removeEventListener('scroll', this.scrollBottom, false);
    }
}

