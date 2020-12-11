<template>
  <b-card>
    <FormValidations :validations="validations" />
     <slot></slot>
    <FormActions
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