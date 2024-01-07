import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

const path = '/auth';

enum Api {
  UserRouter = '/user/router',
}

/**
 * @description: Get user menu based on id
 */

export const userRouter = () => {
  return defHttp.get<getMenuListResultModel>({ url: `${path}${Api.UserRouter}` });
};
