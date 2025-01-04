import { UserType } from '../types/user';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getAllUsers = async (page: number): Promise<UserType[]> => {
  const url = `${baseURL}/users?_limit=5&_page=${page}&_sort=name`;
  const data = await axios.get(url).then((res) => res.data);
  return data;
};

export const getUserByName = async (
  name: string,
  page: number
): Promise<UserType[]> => {
  const url = `${baseURL}/users?name_like=${name}&_page=${page}&_sort=name&_limit=5`;
  const data = await axios.get(url).then((res) => res.data);
  return data;
};

export const addNewUser = async (user: UserType) => {
  const url = `${baseURL}/users`;
  return axios.post(url, user);
};

export const updateUser = async (user: UserType, userid: number) => {
  const url = `${baseURL}/users/${userid}`
  return axios.put(url, user)
}
