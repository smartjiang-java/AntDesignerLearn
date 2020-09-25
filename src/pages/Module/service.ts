import request from '@/utils/request';
import { ModuleListParams, ModuleListItem } from './data.d';

export async function queryModule(params?: ModuleListParams) {
  return request('/api/module', {
    params,
  });
}

export async function removeModule(params: { key: number[] }) {
  return request('/api/module', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addModule(params: ModuleListItem) {
  return request('/api/module', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateModule(params: ModuleListParams) {
  return request('/api/module', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
