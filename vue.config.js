const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        port: 9527,
        open: true,
    },
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            "element-ui": "ELEMENT",
            "axios": "axios"
        },
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/global/index.scss";`,
            },
        },
    },
    chainWebpack(config) {
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();
        config.plugin("html").tap(args => {
            args[0].title = "猿社区";
            return args;
        });
    }
};
