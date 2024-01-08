import {batchCreate, batchDelete, create, del, detail, download, edit, upload,} from "@/api";

import {defHttp} from '@/utils/http/axios';
import {Operation} from '@/hooks/web/useOperation';
import {BasicFetchResult} from "@/api/model/baseModel";

const path = "/system/role"

enum Api {
  Page = '/page',
  List = '/list',
  Batch = '/batch',
  Upload = '/upload',
  Download = '/download',
}

export type Params = {
  name?: string;
  [key: string]: any;
};

export interface Item {
  id: string;
  code: string;
  name: string;
  description?: string;
  createTime?: string;
  whetherDelete: boolean;
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
 * page
 * @param params
 * @param data
 */
export const apiList = (params: Params, data: Operation) =>
  defHttp.post<ResultModel>({url: `${path}${Api.List}`, params: params, data: data});

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
