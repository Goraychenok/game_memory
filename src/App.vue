<template>
  <div class="memory">
    <div class="container">
      <div class="row">
        <v_Timer />
        <v_Start />
      </div>
      <v_Memory />
      <v_Form />
      <v_Result />
    </div>
  </div>
</template>

<script>
import v_Timer from './components/vue-Timer.vue'
import v_Start from  './components/vue-Start.vue'
import v_Memory from './components/Memory'
import v_Result from './components/vue-Results.vue'
import v_Form from './components/vue-Form.vue'




export default {
  name: 'App',
  components: {
    v_Timer,
    v_Start,
    v_Memory,
    v_Result,
    v_Form
  }
}
</script>

<style lang="scss">
  .memory{
    padding: 80px 0;
  }

</style>
