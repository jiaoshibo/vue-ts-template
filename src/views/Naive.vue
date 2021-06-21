<template>
  <n-form inline :label-width="80" :model="formValue" :rules="rules" :size="size" ref="formRef">
    <n-form-item label="姓名" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item label="年龄" path="user.age">
      <n-input placeholder="输入年龄" v-model:value="formValue.user.age" />
    </n-form-item>
    <n-form-item label="电话号码" path="phone">
      <n-input placeholder="电话号码" v-model:value="formValue.phone" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick()" attr-type="button" type="primary">验证</n-button>
    </n-form-item>
  </n-form>
  <n-button @click="changeModalValue(true)" type="primary">打开弹窗</n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    :style="bodyStyle"
    title="卡片预设"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header-extra> 噢! </template>
    内容
    <template #footer>
      <n-button @click="changeModalValue(false)" type="primary">关闭弹窗</n-button>
  
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent,ref,reactive } from 'vue'
import {useMessage,NForm,NFormItem,NInput,NButton,NModal} from 'naive-ui';
export default defineComponent({
  components:{
    NForm,NFormItem,NInput,NButton,NModal
  },
  setup() {
    const formRef = ref<HTMLFormElement | null>(null);
    const message = useMessage();
    let formValue = reactive({
      user:{
        name:'',age:''
      },
      phone:''
    });
    const handleValidateClick=()=>{
      formRef.value!.validate((errors:any[]|
      undefined)=>{
        if (!errors) {
          console.log(formValue)
          message.success('Valid')
        } else {
          console.log(errors)
          message.error('Invalid')
        }
      })
    }
    const rules = {
      user: {
        name: {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        age: {
          required: true,
          message: '请输入年龄',
          trigger: ['input', 'blur']
        }
      },
      phone: {
        required: true,
        message: '请输入电话号码',
        trigger: ['input']
      }
    };
    let showModal = ref(false);
    const changeModalValue = (flag:boolean)=>{
      showModal.value = flag;
    }
    const bodyStyle = ref({
      width: '600px'
    })
    const segmented = ref({
      content: 'soft',
      footer: 'soft'
    })
    return {
      formRef,
      size:ref('medium'),
      formValue:formValue,
      rules: rules,
      handleValidateClick,
      showModal,
      bodyStyle,
      segmented,
      changeModalValue
    }
  }
})
</script>


<style scoped>

</style>