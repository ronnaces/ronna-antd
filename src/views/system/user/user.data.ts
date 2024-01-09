import {BasicColumn, FormSchema, useTable} from '@/components/Table';
import {userExist} from "@/api/login";
import {apiList} from "@/views/system/role/api";

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 120,
    ifShow: false
  },
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
    dataIndex: 'roleId',
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
