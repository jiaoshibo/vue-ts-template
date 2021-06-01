<template>
  <div class="about">
    <h1 class="title">This is an about page</h1>

    <el-card style="width:480px">
      <template #header>
        <span>表单验证</span>
      </template>
      <el-form :model="ruleForm" label-width="80px" :rules="formRules" ref="elForm">
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="ruleForm.ip"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="ruleForm.port"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetFormValidate">取 消</el-button>
          <el-button type="primary" @click="confirmFormValidate">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,ref } from 'vue';
import * as rules from '@/assets/js/formRules'

interface formType{
  ip:string;
  port:string;
  phonenumber:string;
  id?:number
}
export default defineComponent({
  name:'About',
  setup(){
    console.log('This is an about page');
    const elForm = ref<HTMLFormElement | null>(null)
    onMounted(()=>{
      console.log(elForm)
    });

    return {elForm}
  },
  data(){
    return {
      ruleForm:{} as formType,
      formRules:{
        ip:[{required:true,message:'请输入IP地址',trigger:'blur'},{validator:rules.FormValidate.validateIpAddress,trigger:'blur'}],
        port:[
          {required:true,message:'请输入端口号',trigger:'blur'},
          {validator:rules.FormValidate.validatePort,trigger:'blur'}
        ],
        phonenumber:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {validator:rules.FormValidate.validatePhone,trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    resetFormValidate(){
      this.elForm!.clearValidate()
    },
    confirmFormValidate(){
      this.elForm!.validate((f:boolean)=>{
        if(f){
          console.log(this.ruleForm.ip)
        }
      })
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