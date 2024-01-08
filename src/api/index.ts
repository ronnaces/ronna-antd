import { defHttp as request } from '@/utils/http/axios';
enum Api {
  page = '/page',
  batch = '/batch',
  upload = '/upload',
  download = '/download',
}

/**
 * 导出文件xlsx的mime-type
 */
const XLSX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/**
 * 导出文件xlsx的文件后缀
 */
const XLSX_FILE_SUFFIX = '.xlsx';

/**
 * create
 * @param path
 * @param data
 */
export const create = (path: string, data: any) => request.post({ url: path, data: data });

/**
 * batch create
 * @param path
 * @param data
 */
export const batchCreate = (path: string, data?: any) =>
  request.post({ url: `${path}${Api.batch}`, data: data });

/**
 * page
 * @param path
 * @param params
 * @param data
 */
export const page = (path: string, params?: any, data?: any) =>
  request.post({ url: `${path}${Api.page}`, params: params, data: data });

/**
 * list
 * @param path
 * @param params
 * @param data
 */
export const list = (path: string, params?: any, data?: any) =>
  request.get({ url: path, params: params, data: data });

/**
 * detail
 * @param path
 * @param id
 */
export const detail = (path: string, id?: string) => request.get({ url: `${path}/${id}` });

/**
 * count
 * @param path
 * @param pathVariable
 */
export const count = (path: string, pathVariable?: string) =>
  request.get<number>({ url: `${path}${pathVariable}` });

/**
 * edit
 * @param path
 * @param data
 */
export const edit = (path: string, data?: any) => request.put<boolean>({ url: path, data: data });

/**
 * del
 * @param path
 * @param id
 */
export const del = (path: string, id?: string) => {
  return request.delete<boolean>({ url: `${path}/${id}` });
};

/**
 * batch delete
 * @param path
 * @param data
 */
export const batchDelete = (path: string, data?: any) => {
  return request.delete<boolean>({ url: `${path}${Api.batch}`, data: data });
};

/**
 * download excel
 * @param path
 * @param params
 * @param data
 * @param isXlsx
 */
export const download = (path?: string, params?: any, data?: any, isXlsx = false) => {
  request
    .post({
      url: `${path}${Api.download}`,
      params: params,
      data: data,
      responseType: 'blob',
    })
    .then((result) => {
      if (!result) {
        console.log("文件下载失败");
        return;
      }
      let name;
      if (!data.excel.name) {
        name = '导出文件';
      } else {
        name = data.excel.name;
      }
      const blobOptions = { type: XLSX_MIME_TYPE };
      let fileSuffix = '.xls';
      if (isXlsx) {
        blobOptions['type'] = XLSX_MIME_TYPE;
        fileSuffix = XLSX_FILE_SUFFIX;
      }
      const nav = window.navigator as any;
      if (nav.msSaveBlob) {
        nav.msSaveBlob(new Blob([result], blobOptions), name + fileSuffix);
      } else {
        const url = window.URL.createObjectURL(new Blob([result], blobOptions));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', name + fileSuffix);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    })
    .finally(() => {});
};

/**
 * upload excel
 * @param path
 * @param data
 */
export const upload = (path: string, data?: any) => {
  const formData = new FormData();
  formData.append('file', data.file);
  return request.post({
    url: `${path}${Api.upload}`,
    headers: {
      'Content-type': 'multipart/form-data',
    },
    data: formData,
  });
};
