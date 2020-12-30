import request from "@/utils/request";


export function queryMsg(data) {
    return request({
        url: '/msg/query',
        method: "post",
        data
    })
}

export function countMsg() {
    return request({
        url: '/msg/count',
        method: "get",
    })
}

export function readMsg(data) {
    return request({
        url: '/msg/read',
        method: "post",
        data
    })
}

export function delMsg(data) {
    return request({
        url: '/msg/del',
        method: "post",
        data
    })
}
export function estimateMsg(data) {
    return request({
        url: '/msg/delAll',
        method: "post",
        data
    })
}


