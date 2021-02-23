import request from "@/utils/request";

export function appIndex() {
    return request({
        url: '/app/index',
        method: "get",
    })
}

export function appMd() {
    return request({
        url: '/app/md',
        method: "get",
    })
}
