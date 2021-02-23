import localStorage from "@/utils/localStorage";

const state = {
    type: localStorage.get("ARTICLE_TYPE") || -1,
    order: localStorage.get("ARTICLE_ORDER") || 1
};
const mutations = {
    SET_TYPE(state, val) {
        state.type = val
    },
    SET_ORDER(state, val) {
        state.order = val
    }
};
const actions = {
    setType({commit}, val) {
        commit("SET_TYPE", val)
        localStorage.set("ARTICLE_TYPE", val)
    },
    setOrder({commit}, val) {
        commit("SET_ORDER", val)
        localStorage.set("ARTICLE_ORDER", val)
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
