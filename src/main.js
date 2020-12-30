import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./global"

import './styles/jiu.scss'
import './icons'

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
