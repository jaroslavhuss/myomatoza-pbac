import axios, { AxiosResponse } from 'axios';
import { setError } from '../store/gsms/errorSlice';
import { IRegisterFormData } from '../Entities/interfaces/register.interface';
import { GLOBAL_URL } from '../GLOBAL_URL';
import { store } from '../store/store';
import { formatErrorMessage } from '../utils/FormatError';
import { ILoginFormData } from '../Entities/interfaces/login.interface';
import { IMyomatosys } from '../Entities/interfaces/myomatosys.interface';

export const registerUser = async (userData:IRegisterFormData) => {
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+'/auth/register', userData);
    return response.data;
  } catch (error:AxiosResponse & any) {
    if(error.response.status === 401){
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

export const loginUser = async (userData:ILoginFormData) => {
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+'/auth/login', userData);
    return response.data;
  } catch (error:AxiosResponse & any) {
    if(error.response.status === 401){
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

export const createMyomsQuestionnaire = async (myomData: IMyomatosys, token:string, endpoint:string) =>{
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+endpoint, myomData,{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    if(error.response.status === 401){
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}
export const getMyUsers = async (token:string, endpoint:string) =>{
  try {
    const response:AxiosResponse = await axios.get(GLOBAL_URL+endpoint,{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    if(error.response.status === 401){
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

//Delete user by ID
export const deleteUser = async (id:string, token:string, endpoint:string) =>{
  try {
    const response:AxiosResponse = await axios.delete(GLOBAL_URL+endpoint+id,{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    if(error.response.status === 401){
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      window.location.reload();
    }
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

export const getTokensExpiration = async (endpoint:string, token:string) => {
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+endpoint,{token:token.split(" ")[1]},{
      headers: {
        Authorization: token ,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    console.log(error)
  }}