export interface FormData {
    name:string,
      surname:string,
      email:string,
      password:string,
      confirmedPassword:string
  }
  
  export const emptyFormData:FormData = {
    name:"",
    surname:"",
    email:"",
    password:"",
    confirmedPassword:""
  }