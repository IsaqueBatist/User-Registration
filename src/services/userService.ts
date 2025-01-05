import { UserType } from '../types/user';
import axios from 'axios';

const baseURL = 'http://localhost:3000/users';

export const getNumbersOfUsers = async (): Promise<number> => {
  const data: UserType[] = await axios.get(baseURL).then((res) => res.data)
  return data.length
}

export const getAllUsers = async (page: number): Promise<UserType[]> => {
  const url = `${baseURL}?_limit=7&_page=${page}&_sort=name`;
  const data = await axios.get(url).then((res) => res.data);
  return data;
};

export const getUserByName = async (
  name: string,
  page: number
): Promise<UserType[]> => {
  const url = `${baseURL}?name_like=${name}&_page=${page}&_sort=name&_limit=7`;
  const data = await axios.get(url).then((res) => res.data);
  return data;
};

export const addNewUser = async (user: UserType) => {
  const url = `${baseURL}`;
  return axios.post(url, user);
};

export const updateUser = async (user: UserType, userid: number) => {
  const url = `${baseURL}/${userid}`
  return axios.put(url, user)
}

export const deleteUser = async (userId: number) => {
  const url = `${baseURL}/${userId}`
  return axios.delete(url)
}
