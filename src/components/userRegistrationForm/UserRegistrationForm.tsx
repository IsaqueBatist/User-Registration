import React, { useEffect, useState } from 'react';
import './styles.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { DevTool } from '@hookform/devtools';
import { getAdress } from '../../services/viaCep.ts';
import { FormValue } from '../../types/form.ts';
import { getAllUsers } from '../../services/user.ts';

const schema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Email format not valid'),
  dof: z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        return new Date(value);
      }
      return value;
    },
    z.date().refine((date) => !isNaN(date.getTime())),
    {
      message: 'Invalide date',
    }
  ),
  zipCode: z.preprocess(
    (value) => (typeof value === 'string' ? value.replace('-', '') : value),
    z.string().regex(/^\d{8}$/, 'ZIP Code should contain 8 digits')
  ),
  adress: z.object({
    street: z.string().nonempty('Street is required'),
    city: z.string().nonempty('City is required'),
    state: z.string().nonempty('State is required'),
    postalCode: z.string(),
    country: z.string().nonempty('Country is required'),
  }),
});

const UserRegistrationForm = () => {
  const [isCepvalid, SetIsCepValid] = useState(false);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    clearErrors,
  } = useForm<FormValue>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit = (formData: FormValue) => {
    console.log(formData);
  };

  const handleCEPBlur = async (zipCode: string) => {
    try {
      const adress = await getAdress(zipCode);
      if (adress) {
        setValue('adress.street', adress.logradouro);
        clearErrors('adress.street');

        setValue('adress.city', adress.localidade);
        clearErrors('adress.city');

        setValue('adress.state', adress.estado);
        clearErrors('adress.state');

        setValue('adress.country', 'Brazil');
        clearErrors('adress.country');
        SetIsCepValid(true);
      }
    } catch (error) {
      SetIsCepValid(false);
      console.error('Failed to fetch address:', error);
    }
  };
  return (
    <div className="main-container">
      <h2>Register User</h2>
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="input-controler">
            <input type="text" {...register('name')} placeholder="Name" />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input type="email" {...register('email')} placeholder="Email" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="date"
              {...register('dof')}
              placeholder="Date of Birth"
            />
            {errors.dof && <p className="error">{errors.dof.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              {...register('zipCode')}
              placeholder="Zip Code"
              onBlur={(e) => handleCEPBlur(e.target.value)}
            />
            {errors.zipCode && (
              <p className="error">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              disabled={isCepvalid}
              {...register('adress.street')}
              placeholder="Street"
            />
            {errors.adress?.street && (
              <p className="error">{errors.adress?.street.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              disabled={isCepvalid}
              {...register('adress.country')}
              placeholder="Country"
            />
            {errors.adress?.country && (
              <p className="error">{errors.adress?.country.message}</p>
            )}
          </div>
          <div className="input-controler">
            <input
              type="text"
              {...register('adress.postalCode')}
              placeholder="Postal Code"
            />
            {errors.adress?.postalCode && (
              <p className="error">{errors.adress?.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              disabled={isCepvalid}
              {...register('adress.city')}
              placeholder="City"
            />
            {errors.adress?.city && (
              <p className="error">{errors.adress?.city.message}</p>
            )}
          </div>

          <div className="input-controler">
            <input
              type="text"
              disabled={isCepvalid}
              {...register('adress.state')}
              placeholder="State"
            />
            {errors.adress?.state && (
              <p className="error">{errors.adress?.state.message}</p>
            )}
          </div>
        </div>
        <button>Register</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default UserRegistrationForm;
