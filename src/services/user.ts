import { UserType } from '../types/user';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getAllUsers = async (page: number): Promise<UserType[]> => {
  const url = `${baseURL}/users?_limit=5&_page=${page}`;
  const data = await axios.get(url).then((res) => res.data);
  return data;
};
