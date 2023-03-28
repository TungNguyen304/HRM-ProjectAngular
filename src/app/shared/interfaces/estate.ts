import { Iwarning } from "./employee"

export interface IWarningProvider {
    name: Iwarning | null,
    item: Iwarning | null,
    contact: Iwarning | null
}

export interface IWarningDeviceSearch {
    code: Iwarning | null,
    employee: Iwarning | null,
}