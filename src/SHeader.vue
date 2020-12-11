<template>
  <div class="add_subscription">
      <h2>{{ $t(label) }} <span v-if="crudLabel">{{$t(crudLabel)}}</span></h2>
    </div>
</template>

<script>
export default {
props:['label','crudLabel']
}
</script>

<style>

</style>