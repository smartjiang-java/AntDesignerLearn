export interface ModuleListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  moduleName: string;
  projectName: string;
  desc: string;
}

export interface ModuleListParams {
  projectName?: string;
  moduleName?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
