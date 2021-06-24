<template>
<!-- 表单 -->
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
  <!-- 弹窗 -->
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
      <n-button @click="confirmDialogBtn(false)" type="primary">
        <template #icon>
          <n-icon>
            <close-icon />
          </n-icon>
        </template>
        关闭弹窗
      </n-button>
    </template>
  </n-modal>
  <br/>
  <!-- 表格 -->
  <n-space>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :row-key="(row) => row.id"
      :checked-row-keys="checkedRowKeys"
      @update:checked-row-keys="handleCheck"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRaw, readonly } from 'vue'
import { useMessage, NForm, NFormItem, NInput, NButton, NModal, NSpace,useLoadingBar, useNotification, NAvatar, NIcon, NDataTable } from 'naive-ui';

import {Close as CloseIcon} from '@vicons/ionicons5'
export default defineComponent({
  name:'naive',
  components:{
    NForm,NFormItem,NInput,NButton,NModal,NSpace,NAvatar,NIcon,CloseIcon, NDataTable
  },
  setup() {
    // 表单实例
    const formRef = ref<typeof NForm>();
    const message = useMessage();
    const loading = useLoadingBar();
    const notification = useNotification()

    // 表单数据
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
            notification.success({
              content: '说点啥呢',
              meta: '想不出来',
              duration:2000
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
    // 表单验证规则
    const _rules = {
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
    const rules = readonly(_rules)
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
    });

    // 弹窗确认按钮
    function confirmDialogBtn(flag:boolean){
      console.log(toRaw(formValue))
      changeModalValue(flag)
    };

    // 表格 start

    // 表格列数据
    const columns = reactive([
      {
        type: "selection",
        disabled(row:any, index:number) {
          return row.name === "Edward King 3";
        },
      },
      {
        title: "Name",
        key: "name",
      },
      {
        title: "Age",
        key: "age",
      },
      {
        title: "Address",
        key: "address",
      },
    ]);

    // 表格数据
    const tableData = reactive(Array.apply(null, new Array(46)).map((_, index) => ({
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      id: index + 1,
    })));

    // 被选中的列的 key
    let checkedRowKeys = reactive([1,2]);
    // 表格分页配置
    const pagination = reactive({
      pageSize:10,
      pageSlot:5
    });
    // 表格选择时触发
    function handleCheck(key:number[]){
      console.log(key);
      checkedRowKeys = key;
    }
    // 表格 end
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
      resetFormValidate,
      confirmDialogBtn,

      // table start
      tableData,
      columns,
      checkedRowKeys,
      pagination,
      handleCheck
      // table end
    }
  }
})
</script>


<style scoped>

</style>