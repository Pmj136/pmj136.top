<template>
    <div class="jiu-load">
        <!--no-more-->
        <div class="load-container" v-show="total>0 && total===currentDataSize">
            <span class="no-more">没有更多了</span>
        </div>

        <!--data-empty-->
        <div v-show="!isFetch && !total>0" class="data-empty" :style="{'height':wrapHeight+'px'}">
            {{ noDataText }}
        </div>

        <!--loading-->
        <div v-show="isFetch" class="loading-card" :style="{'height':wrapHeight+'px'}">
            <div class="load-line" v-for="item in lines" :key="item"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isFetch: {
            type: Boolean,
            default: false
        },
        total: Number,
        currentDataSize: Number,
        lines: {
            type: Number,
            default: 5
        },
        wrapHeight: {
            type: String,
            default: '200'
        },
        noDataText: {
            type: String,
            default: "暂无数据"
        }
    }
}
</script>
<style scoped lang="scss">
.jiu-load {
    height: 100%;
}

.load-container {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
}

.no-more {
    color: #c3c6cc;
    cursor: not-allowed;
}


/*loading*/
.loading-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    padding: 10px 20px;
    box-sizing: border-box;
}

.load-line {
    height: 14px;
    background: linear-gradient(90deg, #fff, #edeff1, #fff);
    background-size: 480px 480px;
    animation: blinds .6s linear infinite;
}

.load-line:first-child {
    width: 40%;
}

.load-line:nth-child(2) {
    width: 100%;
}

.load-line:nth-child(3) {
    width: 80%;
}

.load-line:last-child {
    width: 60%;
}

@keyframes blinds {
    to {
        background-position: 480px 0;
    }
}

/*empty*/
.data-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #919399;
}

/**/
</style>
