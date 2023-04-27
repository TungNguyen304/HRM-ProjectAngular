export interface IWarning {
  type: string;
  length?: number;
  error?: string;
}

export interface IWarningBasicInfo {
  code: IWarning | null;
  name: IWarning | null;
  sex: IWarning | null;
  birthDay: IWarning | null;
  currentResidence: IWarning | null;
  address: IWarning | null;
  joinDate: IWarning | null;
  hireDate: IWarning | null;
  avt: IWarning | null;
}

export interface IWarningCreateWorkplace {
  code: IWarning | null;
  name: IWarning | null;
  otherName: IWarning | null;
  type: IWarning | null;
  unit: IWarning | null;
  unitSelect: IWarning | null;
}

export interface IWarningContactInfo {
  email: IWarning | null;
  phone: IWarning | null;
  skypeId: IWarning | null;
  name: IWarning | null;
  value: IWarning | null;
}

export interface IWarningOtherInfo {
  unit: IWarning | null;
  position: IWarning | null;
  status: IWarning | null;
  description: IWarning | null;
  cv: IWarning | null;
}

export interface IWarningWorkingProcess {
  unit: IWarning | null;
  position: IWarning | null;
  workingTime: IWarning | null;
  workingForm: IWarning | null;
}

export interface IPosition {
  job_position_id?: string;
  job_position_code: string;
  job_position_name: string;
  job_position_category: string;
  job_position_code_name?: string;
  job_position_other_name: string;
  organization_unit_id: string;
  description?: string;
  organization?: any;
}

export interface IStatus {
  employee_status_id: string;
  employee_status_name: string;
}

export interface ISex {
  value: 'Male' | 'FeMale';
}

export enum ESex {
  MALE = 'Male',
  FEMALE = 'FeMale',
}

export interface IWorkingHistory {
  organization_unit_id: string;
  job_position_id: string;
  from: string;
  to: string;
  working_type: string;
}

export interface ISocialNetwork {
  name: string;
  value: string;
}

export interface IEmployeeRequest {
  employee_code: string;
  email: string;
  cv_url?: string;
  full_name: string;
  gender: {};
  home_land: string;
  temporary_address: string;
  hire_date: string;
  receive_date: string;
  mobile: string;
  birth_date: string;
  image_url?: string | Blob;
  social_network: ISocialNetwork[];
  working_history: IWorkingHistory[];
  organization_unit_id: string;
  job_position_id: string;
  employee_status_id: string;
  description: string;
}

export interface IEmployeeResponse {
  employee_id: string;
  role_id: number;
  email: string;
  image_url: string | undefined;
  cv_url: string;
  full_name: string;
  employee_code: string;
  organization_unit_id: string;
  gender: string;
  birth_date: string;
  birth_place: string;
  temporary_address: string;
  job_position_id: string;
  identify_number: string;
  identify_number_issued_date: string;
  identify_number_issued_place: string;
  identify_number_expired_date: string;
  passport_number: string;
  passport_issued_date: string;
  passport_issued_place: string;
  passport_effect_to_date: string;
  education_level_id: string;
  education_place: string;
  education_faculty: string;
  awarded_year: string;
  education_degree: string;
  occupation: string;
  marital_status: string;
  ethnic: string;
  religion: string;
  nationality: string;
  mobile: string;
  home_land: '';
  native_province: string;
  native_country: string;
  native_address: string;
  temporary_country: string;
  hire_date: string;
  receive_date: string;
  working_place: string;
  employee_status_id: string;
  employee_contract_current_id: string;
  social_network: string[];
  description: string;
  remember_me_token: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  organization: {
    organization_unit_id: string;
    organization_unit_name: string;
    organization_unit_code: string;
    description: string;
    address: '';
    parent_id: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
  job_position: {
    job_position_id: string;
    job_position_name: string;
    job_position_code: string;
    job_position_category: string;
    job_position_code_name: string;
    job_position_other_name: string;
    organization_unit_id: string;
    description: string;
    deleted_at: string;
    created_at: string;
    updated_at: string;
  };
  employee_status: {
    employee_status_id: string;
    employee_status_name: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  user_working_histories?: any;
}

export const fieldFEEmployee = {
  employee_code: 'code',
  email: 'email',
  cv_url: 'cv',
  full_name: 'name',
  gender: 'sex',
  home_land: 'currentResidence',
  temporary_address: 'address',
  hire_date: 'hireDate',
  receive_date: 'joinDate',
  mobile: 'phone',
  birth_date: 'birthDay',
  image_url: 'avt',
  organization_unit_id: 'unit',
  job_position_id: 'position',
  employee_status_id: 'status',
  description: 'description',
};
