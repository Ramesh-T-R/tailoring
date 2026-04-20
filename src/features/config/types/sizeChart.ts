import { MeasurementType } from './measurementType';

export interface SizeType {
  _id: string;
  name: string;
}

export interface SizeChartEntry {
  sizeTypeId: string | SizeType;
  measurementTypeId: string | MeasurementType;
  unit: 'cm' | 'in';
  value: number;
}

export interface SizeChart {
  _id?: string;
  name: string;
  gender: 'Male' | 'Female';
  entries: SizeChartEntry[];
  createdAt?: string;
  updatedAt?: string;
}
