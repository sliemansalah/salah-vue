import SCrump from "./src/SCrump.vue";
import HeaderCrud from "./src/HeaderCrud.vue";
import GroupBtns from "./src/GroupBtns.vue";
import Test from "./src/Test.vue";


export default {
  install(Vue, options) {
    Vue.component("SCrump", SCrump);
    Vue.component("HeaderCrud", HeaderCrud);
    Vue.component("GroupBtns", GroupBtns);
    Vue.component("Test", Test);
  }
};