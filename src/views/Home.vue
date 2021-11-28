<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" @emit-button="getEmitButton" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import {useMessage} from 'naive-ui'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(){
    const message = useMessage()
    function getEmitButton(v:string){
      message.success(v)
    }
    return {getEmitButton}
  }
});
</script>
<style scoped>
.home{
  margin:0 auto;
}
</style>
