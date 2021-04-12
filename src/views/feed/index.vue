<template>
    <section class="jiu-page--feed">
        <jiu-react-box full>
            <div class="jiu-card">
                <div style="padding: 100px">
                    有意合作者，联系首页QQ
                    <p>或邮箱：<a href="mailto:pengmingjiu@gmail.com">pengmingjiu@gmail.com</a> or <a
                        href="mailto:pengmingjiu@aliyun.com">pengmingjiu@aliyun.com</a></p>
                </div>
            </div>
        </jiu-react-box>
    </section>
</template>
<script>
import JiuReactBox from "@/components/JiuReactBox"

export default {
    components: {JiuReactBox},
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
.jiu-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.link {
    font-size: 1.6rem;
    margin: 20px 0;
}

.feed-img {
    width: 200px;
}
</style>
