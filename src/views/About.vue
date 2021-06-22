<template>
  <div class="about">
    <h1 class="title">This is an about page</h1>

    <n-card style="width:480px">
      <template #header>
        <span>表单验证</span>
      </template>
      <n-form :model="ruleForm" label-placement="left"
    label-align="right" label-width="80px" ref="elForm" :rules="formRules">
        <n-form-item label="IP地址" path="ip">
          <n-input v-model:value="ruleForm.ip"></n-input>
        </n-form-item>
        <n-form-item label="端口" path="port">
          <n-input v-model:value="ruleForm.port"></n-input>
        </n-form-item>
        <n-form-item label="手机号" path="phonenumber">
          <n-input v-model:value="ruleForm.phonenumber"></n-input>
        </n-form-item>
        <n-form-item>
          <n-button @click="resetFormValidate">取 消</n-button> &nbsp;
          <n-button type="primary" @click="confirmFormValidate">确 定</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,reactive,ref } from 'vue';
import * as rules from '@/assets/js/formRules'
import {NForm,NFormItem,NInput, NButton, NCard} from 'naive-ui'


export default defineComponent({
  name:'About',
  components:{NForm,NFormItem,NInput, NButton, NCard},
  setup(){
    interface formType{
      ip?:string;
      port?:string;
      phonenumber?:string;
      id?:number
    }
    const elForm = ref<typeof NForm | null>(null)
    onMounted(()=>{
      console.log(elForm)
    });
    const ruleForm = reactive<formType>({
      ip:'',
      port:'',
      phonenumber:''
    });
    const formRules = reactive({
      ip:[{required:true,message:'请输入IP地址',trigger:['blur']},{validator:rules.FormValidate.validateIpAddress,trigger:'blur'}],
      port:[
        {required:true,message:'请输入端口号',trigger:'blur'},
        {validator:rules.FormValidate.validatePort,trigger:'blur'}
      ],
      phonenumber:[
        {required:true,message:'请输入手机号',trigger:'blur'},
        {validator:rules.FormValidate.validatePhone,trigger:'blur'}
      ]
    });
    function confirmFormValidate(){
      elForm.value!.validate((f:boolean)=>{
        if(!f){
          console.log(ruleForm)
        }
      })
    };
    function resetFormValidate(){
      elForm.value!.restoreValidation	()
    }
    return {
      elForm,ruleForm,formRules,
      resetFormValidate,
      confirmFormValidate
    }
  }
})
</script>
<style scoped>
.about{
  margin: 0 auto;
}
.title{
  text-align: center;
}
</style>