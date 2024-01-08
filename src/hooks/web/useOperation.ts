import { reactive } from "vue"

export interface DefaultSorting {
  type: boolean
  fieldList: string[]
}

export interface Sorting {
  type?: boolean
  fieldList?: string[]
}

export const defaultSorting: DefaultSorting[] = [
  {
    type: false,
    fieldList: ["id"],
  },
]

export interface Query {
  fieldName?: string
  fieldValue?: string[]
  operator?: string
  nested?: string
}

export interface Excel {
  name?: string
  sheetName?: string
  fieldList?: string[]
}

export interface Operation {
  page?: number
  pageSize?: number
  fieldList?: string[]
  queryList?: Query[]
  sortList?: Sorting[]
  excel?: Excel
}

export interface DefaultOperation {
  page: number
  pageSize: number
  fieldList: string[]
  queryList: Query[]
  sortList: Sorting[]
  excel: Excel
}

const defaultOperation: DefaultOperation = {
  page: 1,
  pageSize: 10,
  fieldList: [],
  queryList: [],
  sortList: defaultSorting,
  excel: {},
}

export const useOperation = (initialOperation: Operation = {}) => {
  const operation = reactive({ ...defaultOperation, ...initialOperation })
  return { operation: operation }
}
