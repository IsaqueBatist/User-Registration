import React, { useEffect, useState } from 'react';
import './styles.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { DevTool } from '@hookform/devtools';
import { getAdress } from '../../services/viaCep.ts';
import { FormValue } from '../../types/form.ts';
import { getAllUsers } from '../../services/user.ts';
import { addNewUser } from '../../services/userService.ts';

let renderCounter = 0;

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
  address: z.object({
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
    formState: { errors, isValid },
    handleSubmit,
    reset,
    clearErrors,
    setValue,
  } = useForm<FormValue>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });
  const onSubmit = (formData: FormValue) => {
    if (isValid) {
      addNewUser(formData);
      reset();
    }
  };

  const handleCEPBlur = async (zipCode: string) => {
    if (zipCode.length === 8) {
      try {
        const address = await getAdress(zipCode);
        if (address) {
          setValue('address.street', address.logradouro);
          clearErrors('address.street');

          setValue('address.city', address.localidade);
          clearErrors('address.city');

          setValue('address.state', address.estado);
          clearErrors('address.state');

          setValue('address.country', 'Brazil');
          clearErrors('address.country');

          SetIsCepValid(true);
        }
      } catch (error) {
        SetIsCepValid(false);
        console.error('Failed to fetch address:', error);
      }
    } else {
      SetIsCepValid(false);
    }
  };
  renderCounter++;
  return (
    <div className="main-container">
      <h2>Register User, render: {renderCounter / 2}</h2>
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
              disabled
              {...register('address.street')}
              placeholder="Street"
            />
            {errors.address?.street && (
              <p className="error">{errors.address?.street.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              disabled
              {...register('address.country')}
              placeholder="Country"
            />
            {errors.address?.country && (
              <p className="error">{errors.address?.country.message}</p>
            )}
          </div>
          <div className="input-controler">
            <input
              type="text"
              {...register('address.postalCode')}
              placeholder="Postal Code"
            />
            {errors.address?.postalCode && (
              <p className="error">{errors.address?.postalCode.message}</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="input-controler">
            <input
              type="text"
              disabled
              {...register('address.city')}
              placeholder="City"
            />
            {errors.address?.city && (
              <p className="error">{errors.address?.city.message}</p>
            )}
          </div>

          <div className="input-controler">
            <input
              type="text"
              disabled
              {...register('address.state')}
              placeholder="State"
            />
            {errors.address?.state && (
              <p className="error">{errors.address?.state.message}</p>
            )}
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default UserRegistrationForm;
