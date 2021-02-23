import {login, auth, logout} from '@/api/user'
import Storage from "@/utils/localStorage"
import jsCookie from "@/utils/jsCookie";

const state = {
    info: Storage.get("info") || {}
};
const mutations = {
    SET_INFO(state, value) {
        state["info"] = value;
    }
};
const actions = {
    reset({commit}) {
        Storage.clear()
        jsCookie.del("token")
        commit("SET_INFO", {})
    },
    async login({commit}, data) {
        try {
            const res = await login(data)
            commit("SET_INFO", res.data)
            Storage.set("info", res.data)
            return res
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async auth({commit, dispatch}) {
        const res = await auth()
        if (res.data) {
            commit("SET_INFO", res.data)
            Storage.set("info", res.data)
        } else dispatch("reset")
    },
    async logout({dispatch}) {
        try {
            await logout()
            dispatch("reset")
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e)
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
