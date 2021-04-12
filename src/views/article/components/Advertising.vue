<template>
    <div class="jiu-card">
        <div class="jiu-card-header">
            <span class="jiu-card-header--text">技术支持</span>
        </div>
        <div class="container">
            <div class="qq" @click="toQQ">
                QQ:1367559786
            </div>
            <div class="mine">
                Wx:Sweet_case
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        toQQ() {
            window.location.href = 'tencent://message/?uin=1367559786'
        },
    }
}
</script>
<style scoped lang="scss">
.jiu-title {
    border-left-color: #ac1066;
}

.container {
    padding: 10px;
    box-sizing: border-box;
}

.qq, .mine {
    cursor: pointer;
    padding: 14px 0;
    box-sizing: border-box;
    color: #f1f0f0;
    text-align: center;
}

.qq {
    background-color: #708ebd;
    user-select: none;
}

.qq:hover, .mine:hover {
    opacity: 0.8;
}

.mine {
    background-color: #47a16e;
    margin-top: 10px;
    cursor: text;
}

</style>
