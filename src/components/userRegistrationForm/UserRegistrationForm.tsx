import React from 'react';
import './styles.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"

import { DevTool } from '@hookform/devtools';


const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Email format not valid"),
  dof: z.preprocess((value) => {
    if(typeof value === "string"){
      return new Date(value)
    }
    return value
  }, z.date().refine((date) => !isNaN(date.getTime())), {
    message: "Invalide date",
  }),
  zipCode: z.preprocess((value) => {
      if (typeof value === "string") {
        const parsed = parseFloat(value); // Converte a string para número
        if (!isNaN(parsed)) {
          return parsed; // Retorna o número se válido
        }
      }
      return value; // Retorna o valor original para capturar erro de validação
    }, z.number().positive("The number must be positive").int("The number must be an integer")),
  adress: z.object({
    street: z.string().nonempty("Street is required"),
    city: z.string().nonempty("City is required"),
    state: z.string().nonempty("State is required"),
    postalCode:  z.preprocess((value) => {
      if (typeof value === "string") {
        const parsed = parseFloat(value); // Converte a string para número
        if (!isNaN(parsed)) return parsed;
      }
      return value;
    }, z.number().positive("The number must be positive").int("The number must be an integer")),
    country: z.string().nonempty("Country is required")
  })
})

type FormValue = {
  name: string,
  email: string,
  dof: Date,
  zipCode: number,
  adress: Adress
}

type Adress = {
  street: string,
  city: string,
  state: string,
  postalCode: number,
  country: string
}

const UserRegistrationForm = () => {

  const { register, control, formState: {errors}, handleSubmit, reset } = useForm<FormValue>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  const onSubmit = (formData: FormValue) => {
    console.log(formData)
  }

  return (
    <div className="main-container">
      <h2>Register User</h2>
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>

        <div className="row">
          <div className="input-controler">
            <input type="text" {...register('name')} placeholder="Name"/>
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="email" {...register('email')} placeholder="Email"/>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="date" {...register('dof')} placeholder="Date of Birth"/>
            {errors.dof && <p className="error">{errors.dof.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="number" {...register('zipCode')} placeholder="Zip Code"/>
            {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" {...register('adress.street')} placeholder="Street"/>
            {errors.adress?.street && <p className="error">{errors.adress?.street.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" {...register('adress.country')} placeholder="Country"/>
            {errors.adress?.country && <p className="error">{errors.adress?.country.message}</p>}
          </div>
          <div className="input-controler">
            <input type="text" {...register('adress.postalCode')} placeholder="Postal Code"/>
            {errors.adress?.postalCode && <p className="error">{errors.adress?.postalCode.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="text" {...register('adress.city')} placeholder="City"/>
            {errors.adress?.city && <p className="error">{errors.adress?.city.message}</p>}
          </div>

          <div className="input-controler">
            <input type="text" {...register('adress.state')} placeholder="State"/>
            {errors.adress?.state && <p className="error">{errors.adress?.state.message}</p>}
          </div>
        </div>
        <button>Register</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default UserRegistrationForm;
