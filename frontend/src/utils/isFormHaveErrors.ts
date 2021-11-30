import { FormInstance } from "antd";

const haveErrors = (form: FormInstance): boolean => {
  return form.getFieldsError().find((e) => e.errors.length > 0) !== undefined;
};

export { haveErrors };
