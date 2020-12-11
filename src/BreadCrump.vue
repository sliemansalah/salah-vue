<template>
<div class="breadCrumpSection">
    <b-breadcrumb>
        <b-breadcrumb-item v-for="(b,i) in items" :key="i"
        :to="b.to"
        :active="b.active"
        :disabled="b.disabled"
        >
        <component :is="b.icon + 'Icon'" />
        {{$t(b.text)}}
        </b-breadcrumb-item>
  </b-breadcrumb>
</div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {};
  },
  methods:{
    goTo(route){
      window.goTo(route);
    }
  }
};
</script>

<style></style>
