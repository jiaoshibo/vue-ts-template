import { createStore } from 'vuex'
const defaultState = {
  count:0,
  avatar_url:''
}
interface objType{count?:number,url?:string}
export default createStore({
  state(){
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState,obj:objType){
      state.count = obj.count!
    },
    reset(state: typeof defaultState){
      state.count = 0;
    },
    set_avatar_url(state:typeof defaultState,obj:objType){
      state.avatar_url = obj.url!
    }
  },
  actions: {
    increment(context,obj:objType){
      context.commit('increment',obj)
    },
    reset(context){
      context.commit('reset')
    },
    set_avatar_url(context,obj:objType){
      context.commit('set_avatar_url',obj)
    }
  },
  modules: {
  }
})
