import { SizeChart } from './sizeChart';

export interface DressType {
  _id?: string;
  name: string;
  gender: 'Male' | 'Female';
  description: string;
  sizeChartId: string | SizeChart;
}
