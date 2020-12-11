<template>
  <b-card>
    <SFormValidations :validations="validations" />
     <slot></slot>
    <SFormActions
      @clearData="clearData"
      @saveData="saveData"
      @saveDataReturn="saveDataReturn"
      @updateData="updateData"
    />
  </b-card>
</template>

<script>
export default {
  props: ["validations"],
  methods: {
    clearData() {
      this.$emit("clearData");
    },
    saveData() {
      this.$emit("saveData");
    },
     saveDataReturn() {
      this.$emit("saveDataReturn");
    },
    updateData() {
      this.$emit("updateData");
    },
  },
  mounted() {
  },
};
</script>

<style>
</style>