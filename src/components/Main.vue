<template>
  <el-container class="main-container">
    <el-header class="top">
      <Header></Header>
    </el-header>
    <el-main class="content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Header from '@/components/Header.vue';
import { defineComponent } from 'vue'

export default defineComponent({
  name:'Main',
  components:{Header},
})
</script>
<style scoped>
.main-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  widows: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.main-container .top{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background-color: #eee;
}
.main-container .content{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height:100%;
  display: flex;
  justify-content: space-between;
}
</style>
