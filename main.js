import Vue from "vue";
import App from "./app.vue"
import Daily from "./component/Daily.vue"

new Vue({
    el: "#app",
    render: h=>h(Daily)
})