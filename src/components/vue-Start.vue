<template>
  <div class="col-lg-6">
    <input type="submit"  v-if="!start" @click="startGame" value="Начать игру" class="memory__start btn btn-primary">
  </div>
</template>

<script>
export default {
  name: 'v_Start',
  data () {
    return{
      start: false
    }
  },
  computed: {
    changeGameStatus: {
      get() {
        return this.$store.state.startGame
      },
      set(v) {
        this.$store.commit('changeGameStatus', v)
      }

    }
  },
  methods: {
    startGame: function () {
      this.start = !this.start;
      this.changeGameStatus = !this.changeGameStatus

    }
  }
}
</script>


<style>

</style>