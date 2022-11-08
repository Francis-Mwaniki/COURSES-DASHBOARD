import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import veeValidatePlugin from "./include/validation";
import { Icon } from "@iconify/vue";
import VueApexCharts from "vue3-apexcharts";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
/* import "./assets/main.css"; */
// import "flowbite";
import "./assets/tailwind.css";
import "./assets/animate.css";
import "./assets/sass/css/windzo.css";
const app = createApp(App);
app.use(veeValidatePlugin);
app.use(router, Icon);
app.use(VueApexCharts);
app.use(PerfectScrollbar);
app.use(router);

app.mount("#app");

router.beforeEach((to, from, next) => {
  document.querySelector(".flex-sidebar").classList.add("hidden");
  next();
});
