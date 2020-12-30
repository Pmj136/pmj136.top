import request from "@/utils/request";

export function recommend(data) {
    return request({
        url: '/article/recommend',
        method: "post",
        data
    })
}

export function addArticle(data) {
    return request({
        url: '/article/add',
        method: "post",
        data
    })
}

export function concealArticle(data) {
    return request({
        url: '/article/conceal',
        method: "post",
        data
    })
}

export function restoreArticle(data) {
    return request({
        url: '/article/restore',
        method: "post",
        data
    })
}

export function delArticle(data) {
    return request({
        url: '/article/del',
        method: "post",
        data
    })
}


export function updateArticle(data) {
    return request({
        url: '/article/update',
        method: "post",
        data
    })
}

export function getArticleData(params) {
    return request({
        url: '/article/get',
        method: "get",
        params
    })
}

export function getDetailById(data) {
    return request({
        url: '/article/detail',
        method: "post",
        data
    })
}

export function getList(data) {
    return request({
        url: '/article/list',
        method: "post",
        data
    })
}

export function search(data) {
    return request({
        url: '/article/search',
        method: "post",
        data
    })
}

export function uploadImg(data) {
    return request({
        url: '/article/img/upload',
        method: "post",
        type: "file",
        data
    })
}

export function delImg(data) {
    return request({
        url: '/article/img/del',
        method: "post",
        data
    })
}

/*文章收藏*/
export function addArticleCollect(data) {
    return request({
        url: '/article/collect/add',
        method: "post",
        data
    })
}

/*文章取消收藏*/
export function cancelArticleCollect(data) {
    return request({
        url: '/article/collect/cancel',
        method: "post",
        data
    })
}


/*文章点赞*/
export function addArticleStar(data) {
    return request({
        url: '/article/star/add',
        method: "post",
        data
    })
}

/*文章取消点赞*/
export function cancelArticleStar(data) {
    return request({
        url: '/article/star/cancel',
        method: "post",
        data
    })
}
