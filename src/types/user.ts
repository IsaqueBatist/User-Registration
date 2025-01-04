export type UserType = {
  id?: number;
  name: string;
  email: string;
  dof: Date;
  address: Adress;
};

export type Adress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
