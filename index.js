import SCrump from "./src/SCrump.vue";
import SHeader from "./src/SHeader.vue";
import SHeaderBtns from "./src/SHeaderBtns.vue";
import SFormActions from "./src/SFormActions.vue";
import SFormData from "./src/SFormData.vue";
import SFormInputData from "./src/SFormInputData.vue";
import SFormValidations from "./src/SFormValidations.vue";
import STable from "./src/STable.vue";

import aboutIcon from './src/icons/aboutIcon';
import about2Icon from './src/icons/about2Icon';

require('./global.js');

export default {
  install(Vue, options) {
    Vue.component("SCrump", SCrump);
    Vue.component("SHeader", SHeader);
    Vue.component("SHeaderBtns", SHeaderBtns);
    Vue.component("SFormActions", SFormActions);
    Vue.component("SFormData", SFormData);
    Vue.component("SFormInputData", SFormInputData);
    Vue.component("SFormValidations", SFormValidations);
    Vue.component("STable", STable);
    
    Vue.component("aboutIcon", aboutIcon);
    Vue.component("about2Icon", about2Icon);

  }
};