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
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

export const loginUser = async (userData:ILoginFormData) => {
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+'/auth/login', userData);
    return response.data;
  } catch (error:AxiosResponse & any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

export const createMyomsQuestionnaire = async (myomData: IMyomatosys, token:string) =>{
  try {
    const response:AxiosResponse = await axios.post(GLOBAL_URL+'/myom', myomData,{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}
export const getMyUsers = async (token:string) =>{
  try {
    const response:AxiosResponse = await axios.get(GLOBAL_URL+'/myom',{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}

//Delete user by ID
export const deleteUser = async (id:string, token:string) =>{
  try {
    const response:AxiosResponse = await axios.delete(GLOBAL_URL+'/myom/'+id,{
      headers: {
        Authorization: token,
      }
    });
    return response.data;
  } catch (error:AxiosResponse & any) {
    const errorMessage = formatErrorMessage(error);
    store.dispatch(setError(errorMessage));
  }
}