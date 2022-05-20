<template>
  <div class="col-lg-6">
    <div class="memory__timer" >
      <div class="memory__timer-item">
          <div class="memory__num">
            {{days}}
          </div>
          <div class="memory__label">
            {{decLabel(days, ['День', 'Дня', 'Дней'])}}
          </div>
      </div>
      <div class="memory__timer-item">
        <div class="memory__num">
          {{hours}}
        </div>
        <div class="memory__label">
          {{decLabel(hours, ['Час', 'Часа', 'Часов'])}}
        </div>
      </div>
      <div class="memory__timer-item">
        <div class="memory__num">
          {{minutes}}
        </div>
        <div class="memory__label">
          {{decLabel(minutes, ['Минута', 'Минуты', 'Минут'])}}
        </div>
      </div>
      <div class="memory__timer-item">
        <div class="memory__num">
          {{seconds}}
        </div>
        <div class="memory__label">
          {{decLabel(seconds, ['Секунда', 'Секунды', 'Секунд'])}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default{
  name: 'v_timer',
  data() {
    return {
      time: 0,
      duration: 0
    }
  },
  computed: {
    days() {
      return Math.floor(this.time / (3600*24))
    },
    hours() {
      return Math.floor((this.time-this.days*(24*3600)) / 3600)
    },
    minutes() {
      return Math.floor((this.time-this.days*(24*3600) - this.hours*3600) / 60)
    },
    seconds() {
      return this.time-this.days*(24*3600) - this.hours*3600 - this.minutes * 60
    },

    changeGameStatus: {
      get() {
        return this.$store.state.startGame
      }
    }
  },
  methods: {
    tick() {
      this.time += 1
      if (this.time < 0) {
        this.time = this.duration
      }
      this.save()
    },
    save() {
      window.localStorage.setItem('timer', this.time)
    },
    load() {
      this.time = Math.floor((new Date().getTime() - new Date().getTime()) / 1000)
    },
    decLabel: (n, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      const label = titles[ (n%100>4 && n%100<20)? 2 : cases[(n%10<5)?n%10:5] ]
      return `${label}`
    }
  },
  watch:{
    changeGameStatus(v) {
      if(v){
        this.load()
        setInterval(() => {
          this.tick()
        }, 1000)
      }
    }
  }
}
</script>


<style lang="scss">
  .memory__timer{
    display: flex;
    margin-bottom: 40px;
  }
  .memory__timer-item{
    margin: 0 20px;
    display: flex;
    color: #fff;
  }
  .memory__num{
    margin-right: 10px;
  }
</style>