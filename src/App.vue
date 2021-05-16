<template>
<!--   <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/> -->
  <Main />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@/components/Main.vue'
export default defineComponent({
  name:'App',
  components:{
    Main
  }
})
</script>