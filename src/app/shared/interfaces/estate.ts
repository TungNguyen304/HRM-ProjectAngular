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

export interface IProviderRequest {
  name: string;
  items: string;
  address: string;
  contact: string;
  priority?: number;
  description: string;
}

export interface IProviderResponse {
  distributor_id: string;
  name: string;
  items: string;
  address: string;
  contact: string;
  priority: number;
  description: string;
  rate: number;
  count_review: number;
  created_by: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  created_by_user: {
    employee_id: string;
    email: string;
    full_name: string;
    employee_code: string;
  };
}

export interface IDeviceRequest {
  asset_type_id: string;
  asset_code: string;
  asset_name: string;
  user_used_id: string;
  user_using_id: string;
  date_bought: string;
  date_use: string;
  total_amount: number;
  bill_number: string;
  description: string;
  distributor_id: string;
  information: string;
  update_asset_histories: [string];
  status: number;
}

export interface IDeviceResponse {
  asset_id: string;
  asset_type_id: string;
  asset_name: string;
  asset_code: string;
  asset_image_url: null;
  date_bought: string;
  date_use: string;
  total_amount: number;
  bill_number: string;
  description: null;
  distributor_id: string;
  information: null;
  old_asset_id: null;
  status: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  asset_type_collection: {
    asset_type_id: string;
    asset_type_name: string;
  };
  user_used_collection: {
    employee_id: string;
    email: string;
  };
  user_using_collection: null;
}
