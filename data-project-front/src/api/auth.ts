import axios, { AxiosError } from 'axios';
import { CompleteUser } from '../pages/admin/types/user';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};

export const register = async (user: CompleteUser) => {
  try {
    const response = await api.post('/auth/register', user);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};
