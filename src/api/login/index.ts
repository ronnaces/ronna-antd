import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '#/axios';

const path = '/auth';

enum Api {
  Login = '/login',
  Logout = '/logout',
  Userinfo = '/user/info',
  UserPermission = '/user/permission',
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
  return defHttp.get<GetUserInfoModel>(
    { url: `${path}${Api.Userinfo}` },
    { errorMessageMode: 'none' },
  );
};

export const userPermission = () => {
  return defHttp.get<string[]>({ url: `${path}${Api.UserPermission}` });
};
