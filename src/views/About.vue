<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-tag>vuex: {{count}}</el-tag>
    <el-button @click="addCount()">count++</el-button>
    <el-button type="primary" plain @click="resetCount()">重置</el-button>
    <el-button type="primary" plain @click="getHttpRequest()">axios</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {mapState,mapActions} from 'vuex';
import {ElMessage} from 'element-plus'
import axios from '@/utils/axios'
export default defineComponent({
  name:'About',
  created(){
    console.log(this.count)
  },
  computed:{
    ...mapState(['count'])
  },
  methods:{
    ...mapActions(['increment','reset']),
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
        ElMessage.success(data.avatar_url)
        console.log(res)
      }).catch(err=>{
        console.error(err)
      })
    }
  }
})
</script>

