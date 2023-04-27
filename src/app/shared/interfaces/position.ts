export interface IPositionRequest {
  job_position_code: string;
  job_position_name: string;
  job_position_category: string;
  job_position_other_name: string;
  organization_unit_id: string;
}

export const fieldFEPosition = {
  job_position_code: 'code',
  job_position_name: 'name',
  job_position_category: 'type',
  job_position_other_name: 'ortherName',
  organization_unit_id: 'id',
};
