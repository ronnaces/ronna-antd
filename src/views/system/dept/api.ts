import {
  create,
  edit,
  del,
  detail,
  page,
  batchCreate,
  batchDelete,
  download,
  upload,
  list,
  Result,
} from "@/api";
import {defHttp as request, defHttp} from '@/utils/http/axios';

const path = "/system/department"

enum Api {
  departments = "/departments",
  users = "/users",
}

/**
 * page
 * @param params
 * @param data
 */
export const apiList = (params?: any, data?: any) => list(path, params, data)

/**
 * page
 * @param params
 * @param data
 */
export const apiPage = (params?: any, data?: any) => page(path, params, data)

/**
 * detail
 * @param id
 */
export const apiDetail = (id?: string) => detail(path, id)

/**
 * create
 * @param data
 */
export const apiCreate = (data?: any) => create(path, data)

/**
 * batch create
 * @param data
 */
export const apiBatchCreate = (data?: any) => batchCreate(path, data)

/**
 * edit
 * @param data
 */
export const apiEdit = (data?: any) => edit(path, data)

/**
 * del
 * @param id
 */
export const apiDel = (id?: string) => {
  return del(path, id)
}

/**
 * batch delete
 * @param data
 */
export const apiBatchDelete = (data?: any) => batchDelete(path, data)

export const apiDownload = (params?: any, data?: any, isXlsx = false) =>
  download(path, params, data, isXlsx)

export const apiUpload = (data?: any) => upload(path, data)

/**
 * departments
 */
export const apiDepartments = (param?: any) =>
  http.get<{}, Result>(`${path}${Api.departments}`, { params: param })

/**
 * users
 */
export const apiUsers = (param?: any) =>
  http.get<{}, Result>(`${path}${Api.users}`, { params: param })
