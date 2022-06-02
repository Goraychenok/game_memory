<template>
  <div class="memory">
    <div class="container">
      <div class="row">
        <vTimer />
        <vStart />
      </div>
      <vMemory />
      <vForm />
      <vResult />
    </div>
  </div>
</template>

<script>
import vTimer from './components/vue-Timer.vue';
import vStart from './components/vue-Start.vue';
import vMemory from './components/Memory.vue';
import vResult from './components/vue-Results.vue';
import vForm from './components/vue-Form.vue';

export default {
  name: 'App',
  components: {
    vTimer,
    vStart,
    vMemory,
    vResult,
    vForm,
  },
};
</script>

<style lang="scss">
  .memory{
    padding: 80px 0;
  }
  @media (max-width: 1440px) {
    .memory{
      padding: 40px 0;
    }
  }

</style>
