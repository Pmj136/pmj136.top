export const navTitles = [
    {
        path: '/',
        title: '首页',
    },
    {
        path: '/music',
        title: '音乐',
    },
    {
        path: '/feed',
        title: '投喂',
    }
]

export const oauthUrl = {
    "github": "https://github.com/login/oauth/authorize?client_id=77f728b21a32f4fee322",
    "gitee": "https://gitee.com/oauth/authorize" +
        "?client_id=c0d4ddbdf5dc27245fad262ac4121550fa6c10d9a4460a310a1221040e4238ac" +
        "&response_type=code" +
        "&redirect_uri=https://api.pmj136.top/oauth/gitee/callback",
    "dingtalk": "https://oapi.dingtalk.com/connect/qrconnect" +
        "?appid=dingoaive5bh1vdijmpzcw" +
        "&response_type=code" +
        "&scope=snsapi_login" +
        "&redirect_uri=https://api.pmj136.top/oauth/dingtalk/callback"
}
export const emailSuffix = [
    "@qq.com",
    "@163.com",
    "@sina.com",
    "@sohu.com",
    "@gmail.com",
    "@126.com",
    "@yahoo.com",
    "@hotmail.com",
    "@foxmail.com"
]