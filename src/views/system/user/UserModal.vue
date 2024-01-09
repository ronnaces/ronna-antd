<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {computed, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '@/components/Modal';
import {BasicForm, FormSchema, useForm} from '@/components/Form';
import {userBindDepartment, userBindRole, userDepartment, userExist} from "@/api/login";
import {apiCreate, apiEdit} from "@/views/system/user/api";
import {apiList} from "@/views/system/role/api";

defineOptions({name: 'UserModal'});

const emit = defineEmits(['success', 'register']);

const isUpdate = ref(true);
const rowId = ref('');

const userFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    component: 'Input',
    required: false,
    show: false
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve("");
            if (unref(isUpdate)) {
              return resolve("");
            }
            userExist(value)
              .then(res => {
                if (res) {
                  reject('用户名已存在');
                } else {
                  resolve("");
                }
              })
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  // {
  //   field: 'pwd',
  //   label: '密码',
  //   component: 'InputPassword',
  //   required: true,
  //   ifShow: false,
  // },
  {
    label: '角色',
    field: 'roleId',
    component: 'ApiSelect',
    componentProps: {
      api: apiList,
      labelField: 'name',
      valueField: 'id',
    },
    ifshow: unref(isUpdate),
    required: true,
  },
  {
    field: 'departmentId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifshow: unref(isUpdate),
    required: true,
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
  },
];

const [registerForm, {setFieldsValue, updateSchema, resetFields, validate}] = useForm({
  labelWidth: 100,
  baseColProps: {span: 24},
  schemas: userFormSchema,
  showActionButtonGroup: false,
  actionColOptions: {
    span: 23,
  },
});

const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  resetFields();
  setModalProps({confirmLoading: false});
  isUpdate.value = !!data?.isUpdate;

  if (unref(isUpdate)) {
    rowId.value = data.record.id;
    setFieldsValue({
      ...data.record,
    });
  }

  const treeData = await userDepartment();
  updateSchema([
    {
      field: 'pwd',
      show: !unref(isUpdate),
    },
    {
      field: 'departmentId',
      componentProps: {treeData},
    },
  ]);
});

const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({confirmLoading: true});

    const {id, roleId, departmentId} = values
    if (isUpdate) {
      await apiEdit(values);
      await userBindRole({
        mainId: id,
        minorIds: [roleId],
      })
      await userBindDepartment({
        mainId: id,
        minorIds: [departmentId],
      })
    } else {
      await apiCreate(values);
    }
    closeModal();
    emit('success', {isUpdate: unref(isUpdate), values: {...values, id: rowId.value}});
  } finally {
    setModalProps({confirmLoading: false});
  }
}
</script>
