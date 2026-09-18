import type {FormInstance} from "antd";

export type FieldsError = ReturnType<FormInstance['getFieldsError']>
export type FieldError = ReturnType<FormInstance['getFieldsError']>[number]
