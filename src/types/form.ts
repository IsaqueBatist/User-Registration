import { Adress } from './user';

export type FormValue = {
  id: number
  name: string;
  email: string;
  dof: Date;
  zipCode: string;
  address: Adress;
};
