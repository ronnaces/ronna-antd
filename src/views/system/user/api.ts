import {batchCreate, batchDelete, create, del, detail, download, edit, upload,} from "@/api";

import {defHttp} from '@/utils/http/axios';
import {Operation} from '@/hooks/web/useOperation';
import {BasicFetchResult} from "@/api/model/baseModel";

const path = "/system/user"

enum Api {
  CheckUniqueness = "/check/uniqueness",
  ChangePassword = "/change/password",
  ResetPassword = "/reset/password",
  Roles = "/roles",
  Page = '/page',
  Batch = '/batch',
  Upload = '/upload',
  Download = '/download'
}

export type Params = {
  username?: string;
  name?: string;
  [key: string]: any;
};

export interface Item {
  id: string;
  username: string;
  name: string;
  email: string;
  createTime: string;
  description: string;
}

/**
 * @description: Request list return value
 */
export type ResultModel = BasicFetchResult<Item>;

/**
 * page
 * @param params
 * @param data
 */
export const apiPage = (params: Params, data: Operation) =>
  defHttp.post<ResultModel>({url: `${path}${Api.Page}`, params: params, data: data});

/**
 * detail
 * @param id
 */
export const apiDetail = (id?: string) => detail(path, id)

/**
 * create
 * @param data
 */
export const apiCreate = (data: Item) => create(path, data)

/**
 * batch create
 * @param data
 */
export const apiBatchCreate = (data?: any) => batchCreate(path, data)

/**
 * edit
 * @param data
 */
export const apiEdit = (data: Item) => edit(path, data)

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
 * check uniqueness
 * @param data
 */
// export const checkUniqueness = (data?: any) =>
//   defHttp.get(`${path}${Api.CheckUniqueness}`, {data: data})

/**
 * change password
 * @param data
 */
// export const changePassword = (data?: any) =>
//   defHttp.put(`${path}${Api.ChangePassword}`, {data: data})

/**
 * reset password
 * @param data
 */
// export const resetPassword = (data?: any) => defHttp.put(`${path}${Api.ResetPassword}`, {data: data})

/**
 * permission
 */
// export const apiRoles = (param?: any) =>
//   defHttp.get<{}, Result>(`${path}${Api.Roles}`, {params: param})
