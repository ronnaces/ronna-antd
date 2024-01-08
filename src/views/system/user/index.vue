<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect"/>
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';

import {BasicTable, TableAction, useTable} from '@/components/Table';
import {apiPage} from './api';
import {PageWrapper} from '@/components/Page';
import DeptTree from './DeptTree.vue';

import {useModal} from '@/components/Modal';
import UserModal from './UserModal.vue';

import {columns, searchFormSchema} from './user.data';
import {useGo} from '@/hooks/web/usePage';

import {Query, useOperation} from "@/hooks/web/useOperation"
import {LoginParams} from "@/api/sys/model/userModel";
import {ErrorMessageMode} from "#/axios";

defineOptions({name: 'UserManagement'});

const {operation} = useOperation()
const go = useGo();
const [registerModal, {openModal}] = useModal();
const searchInfo = reactive<Recordable>({});
const [registerTable, {reload, updateTableDataRecord}] = useTable({
  title: '账号列表',
  api: apiPage,
  rowKey: 'id',
  columns,
  formConfig: {
    labelWidth: 120,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
  },
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  handleSearchInfoFn(info) {
    defineQueryList(info)
    defineFieldList()
    return operation;
  },
  actionColumn: {
    width: 120,
    title: '操作',
    dataIndex: 'action',
    // slots: { customRender: 'action' },
  },
});

function defineFieldList() {
  operation.fieldList = ["username", "name", "email", "createTime", "description"];
}

function defineQueryList(info) {
  let queryList = [];
  for (let key in info) {
    console.log(key + ": " + info[key]);
    if (info[key]) {
      let query = {
        fieldName: key,
        fieldValue: [info[key]],
        operator: "=",
        nested: "AND"
      } as Query;
      queryList.push(query);
    }
  }
  operation.queryList = queryList;
}

function handleCreate() {
  openModal(true, {
    isUpdate: false,
  });
}

function handleEdit(record: Recordable) {
  console.log(record);
  openModal(true, {
    record,
    isUpdate: true,
  });
}

function handleDelete(record: Recordable) {
  console.log(record);
}

function handleSuccess({isUpdate, values}) {
  if (isUpdate) {
    // 演示不刷新表格直接更新内部数据。
    // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    const result = updateTableDataRecord(values.id, values);
    console.log(result);
  } else {
    reload();
  }
}

function handleSelect(deptId) {
  searchInfo.deptId = '';
  reload();
}

function handleView(record: Recordable) {
  go('/system/user_detail/' + record.id);
}
</script>
