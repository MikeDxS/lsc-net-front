import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoUrl: '',
    result: {
      class: -1,
      predictions: []
    }
  },
  mutations: {
    setVideoUrl: function(state, videoUrl){
      state.videoUrl = videoUrl;
    },
    setResult: function(state, result){
      state.result = result;
    }
  },
  actions: {
    setVideoUrl: function({ commit }, videoUrl){
      commit('setVideoUrl', videoUrl);
    },
    setResult: function({ commit }, result){
      commit('setResult', result);
    }
  },
  getters: {
    getVideoUrl: state => {
      return state.videoUrl;
    },
    getResult: state => {
      return state.result;
    }
  },
  modules: {
  }
})
