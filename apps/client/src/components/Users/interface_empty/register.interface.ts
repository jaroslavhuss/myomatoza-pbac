export interface IFormData {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export const emptyFormData: IFormData = {
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
};
