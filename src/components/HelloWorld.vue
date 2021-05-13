<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img width="100" height="100" class="avatar" alt="avatar" :src="imgUrl">
    <div>
      <el-tag size="medium">vuex: {{count}}</el-tag>&nbsp;
      <el-button type="primary" @click="addCount()">count++</el-button>
      <el-button @click="resetCount()">重置</el-button>
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
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import {mapState,mapActions} from 'vuex';
import {ElMessage} from 'element-plus'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props){
    console.log('props:',props)
  },
  data(){
    return{
      imgUrl:require('@/assets/logo.png'),
      info:[],
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
    ...mapActions(['increment','reset','set_avatar_url']),
    addCount(){
      this.increment({count:100});
      ElMessage.success(this.count.toString())
      console.log(this.$refs)
    },
    resetCount(){
      this.reset()
    },
    /**使用自定义的axios封装进行请求 */
    getHttpRequest(){
      this.$get('/users/microsoft').then(res=>{
        let data = res.data;
        this.set_avatar_url({url:data.avatar_url});
        this.imgUrl = this.avatar_url;
        console.log(this.avatar_url,"avatar_url");
        console.log(this.imgUrl,"imgUrl");
      }).catch(err=>{
        ElMessage.error(err)
      })
    },
    getCoindeskApi(){
      axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(res=>{
        let data = res.data;
        this.info = data.bpi;
        console.table(this.info)
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
