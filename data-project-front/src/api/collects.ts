import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAverageByWorkCategory = async (token: string) => {
  try {
    const response = await api.get('/clients/averageByWorkCategory', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};

export const getAverageByCategoryByWorkCategory = async (token: string) => {
  try {
    const response = await api.get('/clients/averageByCategoryByWorkCategory', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};

export const getCategories = async (token: string) => {
  try {
    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};

export const getCollects = async (token: string, take?: number) => {
  try {
    const response = await api.get('/collects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        take,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data as AxiosError;
    } else {
      throw error;
    }
  }
};
