import request from "@/utils/request";

export function getRootList(data) {
    return request({
        url: '/remark/root/list',
        method: "post",
        data
    })
}

export function addRoot(data) {
    return request({
        url: '/remark/root/add',
        method: "post",
        data
    })
}

export function delRoot(data) {
    return request({
        url: '/remark/root/del',
        method: "post",
        data
    })
}

export function addChild(data) {
    return request({
        url: '/remark/child/add',
        method: "post",
        data
    })
}

export function delChild(data) {
    return request({
        url: '/remark/child/del',
        method: "post",
        data
    })
}