<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{count}}</span>
    <button @click="addCount()">count++</button>
    <button @click="resetCount()">重置</button>
    <button @click="getHttpRequest()">axios</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import {mapState,mapActions} from 'vuex';
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
    },
    resetCount(){
      this.reset()
    },
    getHttpRequest(){
      axios.get('/users/jiaoshibo').then(res=>{
        console.log(res)
      }).catch(err=>{
        console.error(err);
      })
    }
  }
})
</script>

