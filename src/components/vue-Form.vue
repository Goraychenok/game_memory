<template>
  <form @submit.prevent="onSubmit" v-if="OpenForm" class="memory__form">
      <div class="col-lg-12">
        <div class="memory__form-block">
          <input v-model="name" type="text" class="form-control" required aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="name" placeholder="Введите ваше имя">
          <input type="submit" class="btn btn-success">
        </div>

      </div>
  </form>
</template>

<script>
export default {
  name: 'v_Form',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    onSubmit() {
      const data = {
        name: this.name,
        time: this.returnTime[3] + ':' + this.returnTime[2] + ':' + this.returnTime[1] + ':' + this.returnTime[0]

      }
      this.axios.post('http://localhost:3000/results/', data);
      this.OpenForm = !this.OpenForm
      this.viewResult = !this.viewResult
    }
  },
  computed: {
    returnTime: {
      get() {
        return this.$store.state.time
      }
    },
    viewResult: {
      get() {
        return this.$store.state.viewResult
      },
      set(v) {
        this.$store.commit('openResult', v)
      }
    },
    OpenForm: {
      get() {
        return this.$store.state.stopGame
      },
      set(v){
        this.$store.commit('openForm', v)
      }

    }
  }
}
</script>

<style lang="scss">
.memory__form-block{
  display: flex;
  justify-content: center;
  input{
    max-width: 400px;
    margin-right: 20px;
  }
}
</style>