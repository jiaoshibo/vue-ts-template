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
      <div v-for="item in info" :key="item.code">
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
import { defineComponent, getCurrentInstance } from 'vue';
import {useStore} from 'vuex'
import {mapState,mapActions} from 'vuex';
import { NButton, NTag,useMessage } from 'naive-ui'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components:{ NButton, NTag },
  setup(props,context){;
    const naiveMessage = useMessage();
    function setEmit(msg:string){
      context.emit('emit-button',msg)
    }
    const store = useStore()
    function addCount(){
      store.dispatch('increment',{count:100});
    };
    function resetCount(){
      store.dispatch('reset');
    }
    return{
      naiveMessage,
      setEmit,
      addCount,
      resetCount,
      store
    }
  },
  data(){
    return{
      imgUrl:require('@/assets/logo.png'),
      info:[] as unknown[],
    }
  },
  created(){
    this.getHttpRequest();
    this.getCoindeskApi();
  },
  computed:{
    ...mapState(['count','avatar_url'])
  },
  methods:{
    /**使用自定义的axios封装进行请求 */
    getHttpRequest(){
      this.$get('/users/microsoft').then(res=>{
        let data = res.data;
        this.store.dispatch('set_avatar_url',{url:data.avatar_url});
        this.imgUrl = this.store.state.avatar_url;
      }).catch(err=>{
        this.naiveMessage.error(err)
      })
    },
    getCoindeskApi(){
      this.$get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res=>{
        let data = res.data;
        this.info = data.bpi;
      })
    },
    /**
     * 保留指定的小数位数
     * @param value 待处理的值
     * @param number 保留的小数位数，默认2位
     */
    toFixedValue(value:number,number=2){
      return value.toFixed(number)
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
