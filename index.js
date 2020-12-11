import SCrump from "./src/SCrump.vue";
import SHeader from "./src/SHeader.vue";
import SHeaderBtns from "./src/SHeaderBtns.vue";

export default {
  install(Vue, options) {
    Vue.component("SCrump", SCrump);
    Vue.component("SHeader", SHeader);
    Vue.component("SHeaderBtns", SHeaderBtns);
  }
};