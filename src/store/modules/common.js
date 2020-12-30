const state = {
    authorId: null, //单个文章的作者id
    signVisible: false, //登录弹窗的可见性
    device: "pc",//设备类型pc、mobile
    msgCount: {
        notice_count: 0,
        remark_count: 0,
        star_count: 0
    }
};
const mutations = {
    SET_AUTHOR_ID(state, value) {
        state['authorId'] = value
    },
    SET_SIGN_VISIBLE(state, value) {
        state['signVisible'] = value
    },
    SET_DEVICE(state, value) {
        state['device'] = value
    },
    SET_MSG_COUNT(state, value) {
        Object.assign(state['msgCount'], value)
    },
    DECREASE_COUNT(state, key) {
        state['msgCount'][key] = state['msgCount'][key] - 1
    },
    CLEAR_COUNT(state, key) {
        state['msgCount'][key] = 0
    }
};
const actions = {
    //更新文章作者id
    updateAuthor({commit}, value) {
        commit("SET_AUTHOR_ID", value);
    },
    //设置登录框可见性
    setSignVisible({commit}, value) {
        commit("SET_SIGN_VISIBLE", value);
    },
    //设置客户端设备类型
    setDevice({commit}, value) {
        commit("SET_DEVICE", value);
    },
    //填充消息量
    fillMsgCount({commit}, obj) {
        commit("SET_MSG_COUNT", obj)
    },
    //阅读消息，数量自减
    decreaseCount({commit}, key) {
        commit("DECREASE_COUNT", key)
    },
    //清空消息
    clearMsgCount({commit}, key) {
        commit("CLEAR_COUNT", key)
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
