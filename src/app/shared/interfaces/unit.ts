export interface IUnit {
  children?: IUnit[];
  organization_unit_code: string;
  organization_unit_id: string;
  organization_unit_name: string;
  updated_at: string;
}
export interface IUnitList {
  data: IUnit,
  children?: IUnit[]
}