import { IDemand } from './demand';

export interface IProduct {
  id?: number;
  demandId?: number;
  name: string;
  amount: number;
  value: number;
  demand?: IDemand;
}
