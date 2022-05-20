import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './assets/_index.scss'
import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            startGame: false
        }
    },
    mutations: {
        changeGameStatus(state, v) {
            state.startGame = v
        }
    },

})


const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.mount('#app')
