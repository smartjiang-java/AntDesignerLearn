export interface BasicListItemDataType {
  id: string;
  name: string;
  code:string;
  type: string;
  description: string;
  necessaryStr: string;
  length :number;
  isolation:string;
  publicUsers:string;
  Project:string;
  IsolationProject:string;
  Module:string;
  Package:string;

  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  href: string;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
}
