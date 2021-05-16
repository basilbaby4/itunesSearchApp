import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

// Global registration
Vue.component("vue-bootstrap-typeahead", VueBootstrapTypeahead);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
