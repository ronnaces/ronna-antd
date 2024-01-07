export interface DepartmentItem {
  name: string;
  ranking: number;
  createTime?: string;
  description?: string;
  children?: DepartmentItem[];
}

/**
 * @description: Get menu return value
 */
export type DepartmentModel = DepartmentItem[];
