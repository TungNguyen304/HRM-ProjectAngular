export interface IWarningBasicInfo {
    code: string,
    name: string,
    sex: string,
    birthDay: string,
    currentResidence: string,
    address: string,
    joinDate: string,
    hireDate: string,
    avt: string
}

export interface IWarningCreateWorkplace {
    code: string,
    name: string,
    otherName: string,
    type: string,
    unit: string,
}

export interface IWarningContactInfo {
    email: string,
    phone: string,
    skypeId: string
}

export interface IWarningOtherInfo {
    unit: string,
    position: string,
    status: string,
    description: string,
    cv: string
}