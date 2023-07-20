import axios, { AxiosResponse } from 'axios';
import { setError } from '../store/gsms/errorSlice';
import { IRegisterFormData } from '../Entities/interfaces/register.interface';
import { GLOBAL_URL } from '../GLOBAL_URL';
import { store } from '../store/store';
import { formatErrorMessage } from '../utils/FormatError';
import { ILoginFormData } from '../Entities/interfaces/login.interface';


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