<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {mapState} from 'vuex'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  data(){
    return {
      imgUrl:this.avatar_url
    }
  },
  created(){
    console.log('avatar_url:',this.avatar_url);
  },
  computed:{
    ...mapState(['avatar_url']),
    imgUrl(v){
      console.log('imgUrl:',v)
    }
  }
});
</script>
<style scoped>
.home{
  margin:0 auto;
}
</style>
