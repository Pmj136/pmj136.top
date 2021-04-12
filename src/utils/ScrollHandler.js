export class ScrollBottomListener {
    constructor(offset = 200) {
        this.isLoading = false
        this.offset = offset
    }

    scrollToBottom(callback) {
        let t = document.documentElement.scrollTop;
        let h = document.documentElement.clientHeight;
        let xv = document.body.scrollHeight - this.offset;

        if (t + h >= xv && !this.isLoading) {
            this.isLoading = true
            callback().then(() => {
                this.isLoading = false
            }).catch(e => {
            })
        }
    }

    registerListener(callback) {
        window.addEventListener("scroll", this.scrollToBottom.bind(this, callback), false);
    }

    removeListener() {
        window.removeEventListener('scroll', this.scrollToBottom, false);
    }
}

export class NormalListener {
    scrollToTarget(callback) {
        callback()
    }

    registerListener(callback) {
        window.addEventListener("scroll", this.scrollToTarget.bind(this, callback), false);
    }

    removeListener() {
        window.removeEventListener('scroll', this.scrollToTarget, false);
    }
}

