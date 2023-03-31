import { IWarning } from "./employee"

export interface IWarningProvider {
    name: IWarning | null,
    item: IWarning | null,
    contact: IWarning | null
}

export interface IWarningDeviceSearch {
    code: IWarning | null,
    employee: IWarning | null,
}