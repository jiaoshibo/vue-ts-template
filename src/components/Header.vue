<template>
  <div class="header">
    <div class="title" @click="goHome()">Vue3.x + TypeScript Starter</div>
    <Nav></Nav>
  </div>
</template>
<script lang="ts">
import Nav from '@/components/Nav.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name:'Header',
  components:{Nav},
  methods:{
    goHome(){
      this.$router.push('/')
    }
  }
})
</script>
<style scoped>
.header{
  width:100%;
  height:100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing:border-box;
  font-weight: 600;
}
.header .title{
  font-size: 20px;
  cursor:pointer;
}
</style>
