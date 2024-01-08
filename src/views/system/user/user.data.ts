import {BasicColumn, FormSchema} from '@/components/Table';
import {userExist} from "@/api/login";
import {apiList} from "@/views/system/role/api";

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  /*  {
      title: '所属部门',
      dataIndex: 'dept',
      customRender: ({ value }) => {
        return deptMap[value];
      },
    },*/
  {
    title: '备注',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'name',
    label: '昵称',
    component: 'Input',
    colProps: {span: 8},
  },
];

export const userFormSchema: FormSchema[] = [
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
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: apiList,
      labelField: 'code',
      valueField: 'name',
    },
    required: true,
  },
  {
    field: 'dept',
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
