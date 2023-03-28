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