export interface Iwarning {
    name: string,
    type: string,
    length?: number
}

export interface IWarningBasicInfo {
    code: Iwarning | null,
    name: Iwarning | null,
    sex: Iwarning | null,
    birthDay: Iwarning | null,
    currentResidence: Iwarning | null,
    address: Iwarning | null,
    joinDate: Iwarning | null,
    hireDate: Iwarning | null,
    avt: Iwarning | null
}

export interface IWarningCreateWorkplace {
    code: Iwarning | null,
    name: Iwarning | null,
    otherName: Iwarning | null,
    type: Iwarning | null,
    unit: Iwarning | null,
}

export interface IWarningContactInfo {
    email: Iwarning | null,
    phone: Iwarning | null,
    skypeId: Iwarning | null
}

export interface IWarningOtherInfo {
    unit: Iwarning | null,
    position: Iwarning | null,
    status: Iwarning | null,
    description: Iwarning | null,
    cv: Iwarning | null
}

export interface IPosition {
    job_position_code: string,
    job_position_name: string,
    job_position_category: string,
    job_position_code_name: string,
    job_position_other_name: string,
    organization_unit_id: string,
    description: string
}