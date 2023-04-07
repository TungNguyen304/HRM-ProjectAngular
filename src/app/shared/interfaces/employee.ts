export interface IWarning {
  type: string;
  length?: number;
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
  value: IWarning | null
}

export interface IWarningOtherInfo {
  unit: IWarning | null;
  position: IWarning | null;
  status: IWarning | null;
  description: IWarning | null;
  cv: IWarning | null;
}

export interface IWarningWorkingProcess {
  unit: IWarning | null,
  position: IWarning | null,
  workingTime: IWarning | null,
  workingForm: IWarning | null
}

export interface IPosition {
  job_position_id?: string,
  job_position_code: string;
  job_position_name: string;
  job_position_category: string;
  job_position_code_name?: string;
  job_position_other_name: string;
  organization_unit_id: string;
  description?: string;
  organization?:any
}
