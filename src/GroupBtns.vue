<template>
  <div class="btn-groups">
    <b-button
      v-for="item in items"
      :key="item"
      @click="goTo(item.route)"
      class="add-btn"
      :variant="item.variant"
    >
      <i v-if="item.arIcon && getLanguage() == 'ar'" :class="item.arIcon"></i>
      <i v-else :class="item.icon"></i>

      {{ $t(item.label) }}
      <span v-if="item.crudLabel"> {{ $t(item.crudLabel) }}</span>
    </b-button>
  </div>
</template>

<script>
export default {
  props: ["items"],
  methods: {
    getLanguage() {
      return window.getLanguage();
  },
    goTo(route) {
      window.goTo(route);
    },
  },
};
</script>

<style>
</style>