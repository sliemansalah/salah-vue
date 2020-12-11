import SCrump from "./src/SCrump.vue";
import HeaderCrud from "./src/HeaderCrud.vue";
import GroupBtns from "./src/GroupBtns.vue";


export default {
  install(Vue, options) {
    Vue.component("SCrump", SCrump);
    Vue.component("HeaderCrud", HeaderCrud);
    Vue.component("GroupBtns", GroupBtns);
  }
};