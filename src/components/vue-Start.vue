<template>

  <div class="col-lg-6">
    <slide-up-down v-model="start" :duration="1000">
      <input type="submit"  v-if="start" @click="startGame" value="Начать игру" class="memory__start btn btn-primary">
    </slide-up-down>
  </div>

</template>

<script>
import SlideUpDown from 'vue3-slide-up-down';

export default {
  name: 'v_Start',
  components: {
    SlideUpDown,
  },
  data() {
    return {
      start: true,
    };
  },
  computed: {
    changeGameStatus: {
      get() {
        return this.$store.state.startGame;
      },
      set(v) {
        this.$store.commit('changeGameStatus', v);
      },
    },
  },
  methods: {
    startGame() {
      this.start = !this.start;
      this.changeGameStatus = !this.changeGameStatus;
    },
  },
};
</script>

<style>

</style>
