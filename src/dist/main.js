"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var App_vue_1 = require("./App.vue");
var router_1 = require("./router");
var store_1 = require("./store");
var index_vue_1 = require("@/components/LoadingBox/index.vue");
var index_1 = require("@/plugins/index");
var element_plus_1 = require("element-plus");
require("element-plus/lib/theme-chalk/index.css");
var app = vue_1.createApp(App_vue_1["default"]);
// 加载组件
app.component('loading', index_vue_1["default"]);
app
    .use(store_1["default"])
    .use(router_1["default"])
    .use(index_1["default"])
    .use(element_plus_1["default"])
    .mount('#app');

//# sourceMappingURL=main.js.map
