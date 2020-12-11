# what is this

Salah Vue library under development...


# Requirements

* vue ::: `npm i vue --save`
* bootstrap-vue ::: `npm i bootstrap-vue --save`
* vue-i18n ::: `npm i vue-i18n --save`
* vue-js-toggle-button ::: `npm i vue-js-toggle-button --save`
* vue2-datepicker ::: `npm i vue2-datepicker --save`
* vuex ::: `npm i vuex --save`
* moment ::: `npm i moment --save`
* lodash ::: `npm i lodash --save`
* axios ::: `npm i axios --save`


# Installation

`npm i salah-vue --save`

... then

```
import salahVue from "salah-vue";
Vue.use(salahVue);

```

# Documentation 

## SCrump 

* in page.vue  

```
    <SCrump :items="SCrump" />

    data() {
        return {
            SCrump: [
        {
          icon: "about2",
          text: "Categories",
          disabled: true,
        },
        {
          text: "View",
          to: "/categories",
        },
        {
          text: "Details",
          active: true,
        },
      ],
        instead of flatIcon: "about2" you can use 
        icon: "fa fa-users",
    icon: may be fontAwsome and use as "fa fa-users" or from flaticon svg convert to vue component.
    text: label of breadcrump
    disabled: to make disabled.
    active: to make active.
    to: to go the route

```


# Developer

* Name: Solayman Majed Salah
* Email: slieman2001@hotmail.com
