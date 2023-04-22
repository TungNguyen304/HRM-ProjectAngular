import { IWarning } from './employee';

export interface IWarningProvider {
  name: IWarning | null;
  item: IWarning | null;
  contact: IWarning | null;
  address: IWarning | null;
}

export interface IWarningDeviceSearch {
  code: IWarning | null;
  employee: IWarning | null;
}

export interface IWarningBasicInfoDevice {
  code: IWarning | null;
  name: IWarning | null;
  type: IWarning | null;
  provider: IWarning | null;
  buyDate: IWarning | null;
  billNumber: IWarning | null;
  money: IWarning | null;
  employee: IWarning | null;
  status: IWarning | null;
}

export interface IWarningRepairForm {
  repairDate: IWarning | null;
  content: IWarning | null;
  money: IWarning | null;
}

export interface IAssetHistory {
  update_asset_history_id?: string;
  date_updated: Date;
  content_updated: string;
  total_amount: number;
}
