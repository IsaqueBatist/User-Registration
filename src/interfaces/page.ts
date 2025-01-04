import { UserType } from '../types/user';

export interface Page {
  content: UserType[];
  length: number;
  page: number;
  nextPage: boolean;
}
