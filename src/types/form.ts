import { Adress } from './user';

export type FormValue = {
  name: string;
  email: string;
  dof: Date;
  zipCode: string;
  address: Adress;
};
