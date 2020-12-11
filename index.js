import BreadCrump from "./src/BreadCrump.vue";
import HeaderCrud from "./src/HeaderCrud.vue";
import GroupBtns from "./src/GroupBtns.vue";


export default {
  install(Vue, options) {
    Vue.component("BreadCrump", BreadCrump);
    Vue.component("HeaderCrud", HeaderCrud);
    Vue.component("GroupBtns", GroupBtns);
  }
};