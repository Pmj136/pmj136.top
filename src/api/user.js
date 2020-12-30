import request from "@/utils/request";

export function login(data) {
    return request({
        url: '/user/login',
        method: "post",
        data
    })
}


export function logout() {
    return request({
        url: "/user/logout",
        method: "post"
    })
}

export function auth() {
    return request({
        url: "/user/auth",
        method: "get",
    })
}

export function getDetail(params) {
    return request({
        url: "/user/get",
        method: "get",
        params
    })
}

export function updateInfo(data) {
    return request({
        url: "/user/info/update",
        method: "post",
        data
    })
}

export function updatePwd(data) {
    return request({
        url: "/user/pwd/update",
        method: "post",
        data
    })
}

export function uploadAvatar(data) {
    return request({
        url: "/user/avatar/upload",
        method: "post",
        type: "file",
        data
    })
}

export function sign() {
    return request({
        url: "/user/sign",
        method: "post"
    })
}


export function checkEmail(data) {
    return request({
        url: "/user/email/check",
        method: "post",
        data
    })
}

export function bindEmail(data) {
    return request({
        url: "/user/email/bind",
        method: "post",
        data
    })
}

export function unbind(data) {
    return request({
        url: "/user/oauth/unbind",
        method: "post",
        data
    })
}

export function postCode(data) {
    return request({
        url: "/user/code/post",
        method: "post",
        data
    })
}

export function getDynamics(data) {
    return request({
        url: "/user/dynamics/list",
        method: "post",
        data
    })
}

export function addNotice(data) {
    return request({
        url: '/user/notice/add',
        method: "post",
        data: Object.assign(data, {action: 1})
    })
}

export function cancelNotice(data) {
    return request({
        url: '/user/notice/cancel',
        method: "post",
        data: Object.assign(data, {action: 2})
    })
}




