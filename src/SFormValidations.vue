<template>
  <b-alert
    id="validationsErrors"
    :show="validations.showErrors"
    dismissible
    fade
    variant="danger"
    @dismissed="validations.showErrors = false"
  >
    <span v-html="validations.errors" />
  </b-alert>
</template>

<script>
export default {
  props: ["validations"],
};
</script>

<style>
</style>