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
      <n-space>
        <n-button @click="handleValidateClick()" attr-type="button" type="primary">验证</n-button>
      <n-button @click="resetFormValidate()">重置</n-button>
      </n-space>
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
import { defineComponent, ref, reactive,h } from 'vue'
import { useMessage, NForm, NFormItem, NInput, NButton, NModal, NSpace,useLoadingBar, useNotification, NAvatar } from 'naive-ui';
export default defineComponent({
  components:{
    NForm,NFormItem,NInput,NButton,NModal,NSpace,NAvatar
  },
  setup() {
    const formRef = ref<typeof NForm>();
    const message = useMessage();
    const loading = useLoadingBar();
    const notification = useNotification()
    let formValue = reactive({
      user:{
        name:'',age:''
      },
      phone:''
    });
    /** 表单验证 */
    const handleValidateClick=()=>{
      if (formRef.value) {
        loading?.start()
        formRef.value.validate((errors: any[] |
          undefined) => {
          if (!errors) {
            notification.create({
              title: "Wouldn't it be Nice",
              description: 'From the Beach Boys',
              content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong
You know its gonna make it that much better
When we can say goodnight and stay together
Wouldn't it be nice if we could wake up
In the morning when the day is new
And after having spent the day together
Hold each other close the whole night through`,
              meta: '2019-5-27 15:11',
              duration:5000,
              avatar: () =>
                h(NAvatar, {
                  size: 'small',
                  round: true,
                  src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
                }),
              onAfterLeave: () => {
                message.success("Wouldn't it be Nice")
              }
            })
            loading?.finish()
          } else {
            loading?.error()
            message.error('Invalid')
          }
        })
      }
    };
    /**表单验证重置 */
    const resetFormValidate = ()=>{
      formRef.value!.restoreValidation()
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
    /**
     * 切换弹窗显示
     * @param flag
     */
    const changeModalValue = (flag:boolean)=>{
      showModal.value = flag;
    }
    const bodyStyle = reactive({
      width: '600px'
    })
    const segmented = reactive({
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
      changeModalValue,
      resetFormValidate
    }
  }
})
</script>


<style scoped>

</style>