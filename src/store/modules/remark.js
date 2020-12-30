const state = {
    params: {
        comment_id: null,
        parent_id: null,
        target_id: null,
        target_nick: null
    },
    input_ref: null
};
const mutations = {
    SET_PARAMS(state, obj) {
        state.params = obj
    },
    SET_INPUT_REF(state, val) {
        state['input_ref'] = val
    }
};
const actions = {
    setParams({commit}, params) {
        commit("SET_PARAMS", params)
    },
    setInputRef({commit}, val) {
        commit("SET_INPUT_REF", val)
    },
    reset({commit}) {
        commit("SET_PARAMS", {
            comment_id: null,
            parent_id: null,
            target_id: null,
            target_nick: null
        })
        commit("SET_INPUT_REF", null)
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
