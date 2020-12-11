<template>
  <b-row class="form-actions-btn">
        <b-button size="md" @click="clearData" variant="danger" class="mr-2">{{
          $t("Clear")
        }}</b-button>
        <b-button v-if="!$route.params.id" size="md" @click="saveData" variant="success" class="mr-2">{{
          $t("Save with add")
        }}</b-button>
        <b-button v-if="!$route.params.id"
          size="md"
          @click="saveDataReturn"
          variant="primary"
          class="mr-2"
          >{{ $t("Save") }}</b-button
        >
         <b-button v-else size="md" @click="updateData" variant="primary" class="mr-2">{{
          $t("Update")
        }}</b-button>
      </b-row>
</template>

<script>
export default {
    methods: {
        clearData() {
            this.$emit('clearData')
        },
        saveData() {
            this.$emit('saveData')
        },
        updateData() {
            this.$emit('updateData')
        },
        saveDataReturn() {
          this.$emit('saveDataReturn')
        }
    }
}
</script>

<style>

</style>