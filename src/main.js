import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createStore } from 'vuex';
import App from './App.vue';
import './assets/_index.scss';

const store = createStore({
  state() {
    return {
      startGame: false,
      time: [],
      stopGame: false,
      viewResult: false,
    };
  },
  mutations: {
    changeGameStatus(v) {
      this.state.startGame = v;
    },
    writeTime(time) {
      this.state.time = time;
    },
    openForm(v) {
      this.state.stopGame = v;
    },
    openResult(v) {
      this.state.viewResult = v;
    },
  },
});

const app = createApp(App);
app.use(VueAxios, axios);
app.use(store);
app.mount('#app');
