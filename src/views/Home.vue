<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" @emit-button="getEmitButton" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(){
    function getEmitButton(v:string){
      console.log(v)
    };
    return {getEmitButton}
  }
});
</script>
<style scoped>
.home{
  margin:0 auto;
}
</style>
