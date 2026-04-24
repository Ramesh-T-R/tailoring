import { SizeChart } from './sizeChart';

export interface DesignCombination {
  _id?: string;
  designIds: string[];
}

export interface DressType {
  _id?: string;
  name: string;
  gender: 'Male' | 'Female';
  description: string;
  sizeChartId: string | SizeChart;
  designCombinations: DesignCombination[];
}
