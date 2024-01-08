import {BasicColumn, FormSchema} from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'code',
    width: 180,
  },
  /*  {
      title: '排序',
      dataIndex: 'orderNo',
      width: 50,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 120,
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.status === '1',
          checkedChildren: '停用',
          unCheckedChildren: '启用',
          loading: record.pendingStatus,
          onChange(checked: CheckedType) {
            record.pendingStatus = true;
            const newStatus = checked ? '1' : '0';
            const { createMessage } = useMessage();
            setRoleStatus(record.id, newStatus)
              .then(() => {
                record.status = newStatus;
                createMessage.success(`已成功修改角色状态`);
              })
              .catch(() => {
                createMessage.error('修改角色状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          },
        });
      },
    },*/
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: {span: 8},
  },
  /*  {
      field: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: [
          { label: '启用', value: '1' },
          { label: '停用', value: '0' },
        ],
      },
      colProps: { span: 8 },
    },*/
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'code',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  /*  {
      field: 'status',
      label: '状态',
      component: 'RadioButtonGroup',
      defaultValue: '0',
      componentProps: {
        options: [
          { label: '启用', value: '1' },
          { label: '停用', value: '0' },
        ],
      },
    },*/
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
  },
];
