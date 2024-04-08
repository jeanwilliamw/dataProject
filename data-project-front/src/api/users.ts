import axios, { AxiosResponse } from 'axios';
import { User } from '../pages/admin/types/user';

const BASE_URL = 'http://localhost:3001/api';

export const getAllUsers = async (token: string): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get(
      `${BASE_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (
  userData: Partial<User>,
  token: string,
): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.post(
      `${BASE_URL}/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  userData: Partial<User>,
  token: string,
): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.patch(
      `${BASE_URL}/users/${userId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (
  userId: number,
  token: string,
): Promise<string> => {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'OK';
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
