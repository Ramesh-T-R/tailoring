import { IDesignCategory } from './designCategory';

export interface IDesign {
  _id?: string;
  name: string;
  category: string | IDesignCategory;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
