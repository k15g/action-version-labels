// Define simple definition of map[string]string
export type strMap = { [k: string]: string }

export interface Spec {
    label: string
    value: string
    regex: string
    replace: string
}