import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, UserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '#/axios';
import {MenuResultModel} from "@/api/login/model/menuModel";
import {DepartmentModel} from "@/api/login/model/departmentModel";

const path = '/auth';

enum Api {
  Login = '/login',
  Logout = '/logout',
  Userinfo = '/user/info',
  UserPermission = '/user/permission',
  UserDepartment = '/user/department',
  UserRouter = '/user/router',
  UserExist = '/user/exist',
}

export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<LoginResultModel>(
    {
      url: `${path}${Api.Login}`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
};

export const logoutApi = () => {
  return defHttp.get({ url: `${path}${Api.Logout}` });
};

export const userinfo = () => {
  return defHttp.get<UserInfoModel>(
    { url: `${path}${Api.Userinfo}` },
    { errorMessageMode: 'none' },
  );
};

export const userPermission = () => {
  return defHttp.get<string[]>({ url: `${path}${Api.UserPermission}` });
};

export const userRouter = () => {
  return defHttp.get<MenuResultModel>({ url: `${path}${Api.UserRouter}` });
};

export const userDepartment = () => {
  return defHttp.get<DepartmentModel>({ url: `${path}${Api.UserDepartment}` });
};
export const userExist = (username: string) =>
  defHttp.get({url: `${path}${Api.UserExist}`, params: {username}}, {errorMessageMode: 'none'});


