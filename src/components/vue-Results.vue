<template>
  <div class="memory__result" v-if="openResult" >
    <div class="memory__result-title">
      Результаты
    </div>
    <div class="memory__result-row">
      <div class="memory__result-id memory__result-elem">
        №
      </div>
      <div class="memory__result-name memory__result-elem">
        Имя
      </div>
      <div class="memory__result-time memory__result-elem">
        Время
      </div>
    </div>
    <div class="memory__result-row" v-bind:key="item.key" v-for="(item, i) in elements">
      <div class="memory__result-id memory__result-elem">
        {{i + 1}}
      </div>
      <div class="memory__result-name memory__result-elem">
          {{item.name}}
      </div>
      <div class="memory__result-time memory__result-elem">
        {{item.time}}
      </div>
    </div>
  </div>
</template>


<script>
import randomKey from "../../helpers/randomKey";

export default {
  name: 'vue_Result',
  data() {
    return {
      elements: [

      ]
    }
  },
  async created(){

  },
  computed: {
    openResult: {
      get() {
        return this.$store.state.viewResult
      }
    },
  },
  methods: {
    async fetchResult()  {
      const res = await this.axios.get('http://localhost:3000/results/')
      this.info = res.data
      this.info.forEach((element) => {
        let el = {
          id: element.id,
          key: randomKey(),
          name: element.name,
          time: element.time,
        };
        this.elements.push(el)
      })
    }
  },
  watch: {
    openResult(v) {
      if(v){
        this.fetchResult()
      }

    }
  }
}
</script>


<style lang="scss">
  .memory__result-title{
    font-size: 36px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
  }
  .memory__result-row{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 2px solid #fff;
    padding: 20px 20px;
  }
  .memory__result-elem{
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .memory__result-id{
    text-align: left;
  }
  .memory__result-time{
    text-align: right;
  }
</style>