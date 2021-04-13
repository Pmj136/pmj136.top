<template>
    <div class="jiu-react-bottom">
        <slot></slot>
        <jiu-load
            ref="bottomDom"
            :is-fetch="isFetch"
            :total="total"
            :current-data-size="currentDataSize"/>
    </div>
</template>

<script>
import JiuLoad from "../JiuLoad"

export default {
    components: {JiuLoad},
    data() {
        return {
            isReachBottom: false,
        };
    },
    props: {
        isFetch: Boolean,
        total: Number,
        currentDataSize: Number,
        onScrollBottom: Function,
    },
    created() {
        document.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
        currentDataSize(v) {
            if (v > 0) this.isReachBottom = false
        }
    },
    methods: {
        handleScroll() {
            if (!this.isReachBottom) {
                const vh = document.documentElement.clientHeight;
                const top = this.$refs.bottomDom.$el.getBoundingClientRect().top;
                if (top - vh < 80) {
                    this.isReachBottom = true;
                    this.onScrollBottom()
                        .then(() => {
                            this.isReachBottom = false;
                        })
                        .catch(() => {
                        });
                }
            }
        },
    },
};
</script>
