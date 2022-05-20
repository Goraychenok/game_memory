
<template>




      <div class="row">
        <div v-bind:key="item.key" class="col-lg-2" v-for="(item, i) in elements">
          <div class="memory__block" @click="cardClick(i)">
            <img v-bind:src="item.img" :class="[{'block': item.cardStatus, 'saved': item.cardOpen}]"  alt="" class="memory__img">
          </div>
        </div>
      </div>

</template>

<script>
import randomKey from '/helpers/randomKey'
import cloneObj from "../../helpers/cloneObj";
export default {
  name: 'v_Memory',
  data() {
    return {
      info: [],
      elements: [

      ],
      start : false,
      selectItems: [

      ]
    }
  },
  async created(){
    const res = await this.axios.get('http://localhost:3000/cards/')
    this.info = res.data
    this.info.forEach((element) => {
      let el = {
        id: element.id,
        img: element.img,
        cardStatus: false,
        key: randomKey(),
        cardOpen: false
      };
      let elT = cloneObj(el)
      this.elements = [...this.elements, el, elT];
    })
    this.elements = this.elements.sort(() => Math.random() - 0.5);
  },
  methods: {
    cardClick: function (i){
        if(this.selectItems.length >= 2){
          return;
        }
        if(this.elements[i].cardStatus === false){
          this.elements[i].cardStatus = !this.elements[i].cardStatus;
          this.selectItems.push(this.elements[i]);
        }
        if(this.selectItems.length === 2) {
          setTimeout(() => this.cardCheck(), 1000);
        }else if(this.selectItems.length === 1){
          setTimeout(() => {
            if(this.elements[i].cardOpen === false){
              this.elements[i].cardStatus = false;
              this.selectItems = [];
            }
            }, 5000)
        }
    },
    cardCheck: function (){
      if(this.selectItems[0]?.img !== undefined && this.selectItems[1]?.img !== undefined){
        if(this.selectItems[0]?.img === this.selectItems[1]?.img){
          this.selectItems[0].cardOpen = true;
          this.selectItems[1].cardOpen = true;
        }else{
          if(this.selectItems[0]?.cardStatus){
            this.selectItems[0].cardStatus = false;
          }
          if(this.selectItems[1]?.cardStatus){
            this.selectItems[1].cardStatus = false;
          }
        }
      }

      this.selectItems = [];
    }
  }
}
</script>

<style lang="scss">
.memory__block{
  aspect-ratio: 2/1;
  width: 100%;
  border-radius: 20px;
  background: gray;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid #fff;
}
.memory__block .memory__img{
  display: none;
  aspect-ratio: 1;
  max-width: 40px;
}
.memory__block .memory__img.block{
  display: block;
}
.memory__block .memory__img.saved{
  display: block !important;
}
</style>