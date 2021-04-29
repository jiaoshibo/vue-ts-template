import { createStore } from 'vuex'
const defaultState = {
  count:0,
  avatar_url:''
}
export default createStore({
  state(){
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState,obj){
      state.count = obj.count
    },
    reset(state: typeof defaultState){
      state.count = 0;
    },
    set_avatar_url(state:typeof defaultState,obj){
      state.avatar_url = obj.url
    }
  },
  actions: {
    increment(context,obj){
      context.commit('increment',obj)
    },
    reset(context){
      context.commit('reset')
    },
    set_avatar_url(context,obj){
      context.commit('set_avatar_url',obj)
    }
  },
  modules: {
  }
})
