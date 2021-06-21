<template>
  <el-container class="main-container">
    <el-header class="current-header">
      <Header/>
    </el-header>
    <el-container class="current-container">
      <el-aside width="200px" class="current-aside"></el-aside>
      <el-main class="current-main">
        <n-loading-bar-provider>
          <n-message-provider>
            <n-notification-provider>
              <n-dialog-provider>
                <router-view></router-view>
              </n-dialog-provider>
            </n-notification-provider>
          </n-message-provider>
        </n-loading-bar-provider>
      </el-main>
    </el-container>
    <el-footer class="current-footer"></el-footer>
  </el-container>
</template>
<script lang="ts">
import Header from '@/components/Header.vue';
import { defineComponent } from 'vue'
import {NMessageProvider,NLoadingBarProvider,NNotificationProvider,NDialogProvider} from 'naive-ui'

export default defineComponent({
  name:'Main',
  components:{Header,NMessageProvider,NLoadingBarProvider,NNotificationProvider,NDialogProvider},
})
</script>
<style scoped>
.main-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.current-header, .current-footer{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  height: 50px;
}

.current-aside{
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}
.current-main{
  background-color: #E9EEF3;
  color: #333;
}
</style>
