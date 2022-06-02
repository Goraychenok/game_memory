<template>
  <slide-up-down v-model="changeGameStatus" :duration="1000">
      <div class="row" >
        <div v-bind:key="item.key" class="col-md-2" v-for="(item, i) in elements">
          <div class="memory__block" @click="cardClick(i)">
              <div class="memory__card">
                  <div class="memory__panel" :class="[{'flip': item.cardStatus, 'saved': item.cardOpen}]">
                    <div class="memory__front">
                      <div class="memory__box">

                      </div>
                    </div>
                    <div class="memory__back">
                      <div class="memory__box">
                        <img v-bind:src="item.img"   alt="" class="memory__img">
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
  </slide-up-down>

</template>

<script>
import SlideUpDown from 'vue3-slide-up-down';
import randomKey from '../../helpers/randomKey';
import cloneObj from '../../helpers/cloneObj';

export default {
  name: 'v_Memory',
  components: {
    SlideUpDown,
  },
  data() {
    return {
      info: [],
      elements: [

      ],
      start: false,
      selectItems: [

      ],
    };
  },
  async created() {
    const res = await this.axios.get('http://localhost:3000/cards/');
    this.info = res.data;
    this.info.forEach((element) => {
      const newEl = {
        id: element.id,
        img: element.img,
        cardStatus: false,
        key: randomKey(),
        cardOpen: false,
      };
      const newElT = cloneObj(newEl);
      this.elements = [...this.elements, newEl, newElT];
    });
    this.elements = this.elements.sort(() => Math.random() - 0.5);
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
    cardClick(i) {
      const El = this.elements[i];
      if (this.selectItems.length >= 2) {
        return;
      }
      if (!El.cardStatus && !El.cardOpen) {
        El.cardStatus = !El.cardStatus;
        this.selectItems.push(El);
      }
      if (this.selectItems.length === 2) {
        setTimeout(() => this.cardCheck(this.selectItems[0], this.selectItems[1]), 1000);
      } else if (this.selectItems.length === 1) {
        setTimeout(() => {
          if (this.selectItems.length === 1) {
            if (!El.cardOpen) {
              El.cardStatus = false;
              this.selectItems = this.selectItems.filter((n) => n.id !== El.id);
            }
          }
        }, 5000);
      }
    },
    cardCheck(firstElem, secondElem) {
      const checkFirstElem = firstElem;
      const checkSecondElem = secondElem;
      if (firstElem?.img !== undefined && secondElem?.img !== undefined) {
        if (firstElem?.img === secondElem?.img) {
          checkFirstElem.cardOpen = true;
          checkSecondElem.cardOpen = true;
        } else {
          if (firstElem?.cardStatus) {
            checkFirstElem.cardStatus = false;
          }
          if (secondElem?.cardStatus) {
            checkSecondElem.cardStatus = false;
          }
        }
      }
      this.selectItems = this.selectItems.filter((n) => n !== checkFirstElem);
      this.selectItems = this.selectItems.filter((n) => n !== checkSecondElem);
    },
  },
  watch: {
    elements: {
      handler() {
        let i = 0;
        this.elements.forEach((element) => {
          if (element.cardOpen) {
            i += 1;
          }
        });
        if (i === this.elements.length) {
          this.changeGameStatus = !this.changeGameStatus;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.memory__block{
  aspect-ratio: 2/1;
  width: 100%;
  cursor: pointer;
  margin-bottom: 20px;
}
.memory__card{
  border-radius: 20px;
  border: 2px solid #fff;
  position: relative;
  height: 100%;
}
.memory__panel{
  position: relative;
  -webkit-perspective: 600px;
  -moz-perspective: 600px;
  .memory__front, .memory__back{
    width: 100%;
  }
  .memory__front{
    height: inherit;
    position: absolute;
    top: 0;
    z-index: 900;
    text-align: center;
    -webkit-transform: rotateX(0deg) rotateY(0deg);
    -moz-transform: rotateX(0deg) rotateY(0deg);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .memory__back{
    height: inherit;
    position: absolute;
    top: 0;
    z-index: 1000;
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
}
.memory__panel.flip{
  .memory__front{
    z-index: 900;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
  }
  .memory__back {
    z-index: 1000;
    -webkit-transform: rotateX(0deg) rotateY(0deg);
    -moz-transform: rotateX(0deg) rotateY(0deg);
  }
}
.memory__box{
  aspect-ratio: 2/1;
  width: 100%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .memory__img{
    max-width: 100px;
  }
}
.memory__front {
  .memory__box{
    background-color: #0d6efd;
  }
}
.memory__back{
  .memory__box{
    background-color: #198754;
  }
}

.memory__block .memory__img.block{
  display: block;
}
.memory__block .memory__img.saved{
  display: block !important;
}
</style>
