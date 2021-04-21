import { createStore } from 'vuex'
const defaultState = {
  count:0
}
interface objType{count:number}
export default createStore({
  state(){
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState,obj:objType){
      state.count = obj.count
    },
    reset(state: typeof defaultState){
      state.count = 0;
    }
  },
  actions: {
    increment(context,obj:objType){
      context.commit('increment',obj)
    },
    reset(context){
      context.commit('reset')
    }
  },
  modules: {
  }
})
