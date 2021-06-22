<template>
  <n-layout>
    <n-layout-header class="current-header">
      <Header />
    </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider class="current-aside">silder</n-layout-sider>
      <n-layout-content class="current-main" content-style="padding:10px" :style="{height:areaHeight+'px'}">
        <n-loading-bar-provider>
          <n-message-provider>
            <n-notification-provider>
              <n-dialog-provider>
                <router-view></router-view>
              </n-dialog-provider>
            </n-notification-provider>
          </n-message-provider>
        </n-loading-bar-provider>
      </n-layout-content>
    </n-layout>
    <n-layout-footer class="current-footer">Footer</n-layout-footer>
  </n-layout>
</template>
<script lang="ts">
import Header from '@/components/Header.vue';
import { defineComponent, onMounted, ref, watch } from 'vue'
import {NMessageProvider,NLoadingBarProvider,NNotificationProvider,NDialogProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider} from 'naive-ui'

export default defineComponent({
  name:'Main',
  components:{Header,NMessageProvider,NLoadingBarProvider,NNotificationProvider,NDialogProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider},
  setup(){
    const areaHeight = ref(0)
    const screenHeight = ref(window.innerHeight || document.documentElement.clientHeight);
    const timer = ref(false);
    onMounted(()=>{
      setAreaHeight()
      window.onresize = ()=>{
        return (()=>{
          screenHeight.value = window.innerHeight || document.documentElement.clientHeight;
        })();
      }
    });
    watch(screenHeight,(current,prev)=>{
      if(!timer.value){
        screenHeight.value = current;
        timer.value = true;
        setAreaHeight()
        setTimeout(() => {
          timer.value=false;
        });
      }
    });
    function setAreaHeight(){
      areaHeight.value = (screenHeight.value) - 100;
      console.log(screenHeight.value,areaHeight.value)
    }
    return {
      screenHeight:screenHeight,
      areaHeight,
      setAreaHeight
    }
  }
})
</script>
<style scoped>
.current-header, .current-footer{
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  height: 50px;
  width: 100%;
  line-height: 50px;
}
.current-footer{
  font-weight: bold;
  font-size: 18px;
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
