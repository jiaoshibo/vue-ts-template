<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img width="100" height="100" class="avatar" alt="avatar" :src="imgUrl">
    <div>
      <n-tag round type="info">vuex: {{count}}</n-tag> &nbsp;
      <n-button type="primary" @click="addCount()">count++</n-button>&nbsp;
      <n-button @click="resetCount()">重置</n-button>
    </div>
    <div class="price_div">
      <h1>Bitcoin Price Index</h1>
      <div v-for="item in infoData" :key="item.code">
        {{item.description}}
        <span class="lighten">
          <span v-html="item.symbol"></span>{{toFixedValue(item.rate_float)}}
        </span>
      </div>
    </div>
    <n-button type="primary" @click="setEmit('set-emit-function')">emit</n-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {useStore} from 'vuex'
import { NButton, NTag,useMessage } from 'naive-ui';

import {$get} from '@/utils/axios';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components:{ NButton, NTag },
  setup(props,context){
    const naiveMessage = useMessage();
    const setEmit = (msg:string)=>{
      context.emit('emit-button',msg)
    }
    const store = useStore();
    let count = ref(store.state.count)
    function addCount(){
      store.dispatch('increment',{count:100});
      count.value = store.state.count
    };
    function resetCount(){
      store.dispatch('reset');
      count.value = store.state.count
    }
    const imgUrl = ref(require('@/assets/logo.png'));
    let infoData = ref([] as unknown[]);

    function getHttpRequest(){
      $get('/users/jiaoshibo').then(res=>{
        let data = res.data;
        store.dispatch('set_avatar_url',{url:data.avatar_url});
        imgUrl.value = store.state.avatar_url;
      }).catch(err=>{
        naiveMessage.error(err)
      })
    };
    function getCoindeskApi(){
      $get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res=>{
        let data = res.data;
        infoData.value = data.bpi;
        console.log(infoData.value)
      }).catch(err=>{
        naiveMessage.error(err)
      })
    };
    onMounted(()=>{
      getHttpRequest();
      getCoindeskApi();
    })
    /**
     * 保留指定的小数位数
     * @param value 待处理的值
     * @param number 保留的小数位数，默认2位
     */
    function toFixedValue(value:number,number=2){
      return value.toFixed(number)
    }
    return {
      naiveMessage,
      setEmit,
      addCount,
      resetCount,
      imgUrl,
      infoData,
      toFixedValue,
      count
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  text-align:center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.avatar{
  /* border-radius: 50%; */
  margin:10px auto;
}
.price_div {
  text-align: left;
  width: 300px;
  margin: auto;
  background-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}
.price_div h1{
  text-align: center;
  margin-bottom: 5px;
}
</style>
