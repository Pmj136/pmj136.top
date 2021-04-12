import Layout from "@/layout"
import Cookie from "@/utils/jsCookie"
import Storage from "@/utils/localStorage"

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.open = function (params) {
    window.open(this.resolve(params).href, "_blank")
}
const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: () => import("@/views/article/index"),
                meta: {
                    title: "猿社区 - 首页",
                    verify: false,
                }
            },
            {
                path: 'article/:article_id',
                component: () => import("@/views/detail/index"),
                meta: {
                    verify: false
                }
            },
            {
                path: 'search',
                component: () => import("@/views/search/index"),
                meta: {
                    title: "搜索结果",
                    verify: false
                }
            },
            {
                path: 'music',
                component: () => import("@/views/music"),
                meta: {
                    title: "猿社区 - 音乐",
                    verify: false,
                }
            },
            {
                path: 'feed',
                component: () => import("@/views/feed"),
                meta: {
                    title: "猿社区 - 投喂",
                    verify: false,
                }
            },
            {
                path: 'user/setting',
                component: () => import("@/views/setting/index"),
                children: [
                    {
                        path: 'profile',
                        component: () => import("@/views/setting/Profile"),
                        meta: {
                            title: "个人资料",
                            verify: true
                        },
                    },
                    {
                        path: 'account',
                        component: () => import("@/views/setting/Account"),
                        meta: {
                            title: "账号设置",
                            verify: true
                        },
                    }
                ]
            },
            {
                path: 'user/:user_id',
                component: () => import("@/views/user"),
                meta: {
                    title: "用户主页",
                    verify: false
                }
            },
            {
                path: 'web/forgot',
                component: () => import("@/views/user/forgot"),
                meta: {
                    title: "找回密码",
                    verify: true
                }
            },
            {
                path: 'notification/:type',
                component: () => import("@/views/notification"),
                meta: {
                    title: "最新消息",
                    verify: true,
                }
            },
        ]
    },
    {
        path: '/creation/add',
        component: () => import("@/views/creation"),
        meta: {
            title: "发布文章",
            verify: true
        }
    },
    {
        path: '/creation/update/:article_id',
        component: () => import("@/views/creation"),
        meta: {
            title: "编辑文章",
            verify: true
        }
    },
    {
        path: '/*',
        component: () => import("@/views/error-page/404"),
        meta: {
            title: "页面未找到",
            verify: false
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

router.beforeEach((to, from, next) => {
    const {meta} = to
    if (meta.verify) {
        const hasToken = Cookie.has("token")
        const info = Storage.get("info")
        if (!hasToken || !info)
            next({path: "/", replace: true})
        else {
            document.title = meta.title;
            next()
        }
    } else {
        if (meta.title) document.title = meta.title;
        next()
    }
});

export default router;
