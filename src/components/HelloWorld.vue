<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img width="100" height="100" class="avatar" alt="avatar" :src="imgUrl">
    <div>
      <el-tag>vuex: {{count}}</el-tag>&nbsp;
      <el-button type="primary" @click="addCount()">count++</el-button>
      <el-button @click="resetCount()">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {mapState,mapActions} from 'vuex';
import {ElMessage} from 'element-plus'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return{
      imgUrl:''
    }
  },
  created(){
    console.log(this.count);
    this.getHttpRequest()
  },
  computed:{
    ...mapState(['count','avatar_url'])
  },
  methods:{
    ...mapActions(['increment','reset','set_avatar_url']),
    addCount(){
      this.increment({count:100});
      ElMessage.success(this.count.toString())
    },
    resetCount(){
      this.reset()
    },
    getHttpRequest(){
      this.$get!('/users/jiaoshibo').then(res=>{
        let data = res.data;
        this.set_avatar_url({url:data.avatar_url});
        this.imgUrl = this.avatar_url;
        console.log(this.avatar_url,"avatar_url");
        console.log(this.imgUrl,"imgUrl");
      }).catch(err=>{
        ElMessage.error(err)
      })
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
  border-radius: 50%;
  margin:10px auto;
}
</style>
