import React from 'react';
import { useFormik, FormikProps } from 'formik';
import Input from 'components/Input';
import { ValuesFormRegister } from 'types';
import register from 'api/register';
import asyncWrapper from 'utils/asyncWrapper';
import validationSchema from './validationSchema';
import setCookie from 'utils/setCookie';

const initialValues = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
};

const FormRegister: React.FC = () => {
  const handleSubmit = async (values: ValuesFormRegister) => {
    const [error, token] = await asyncWrapper<string>(() => register(values));
    if (token) setCookie('auth-token', token, 1);

    console.log('error :>> ', error);
  };

  const formik: FormikProps<ValuesFormRegister> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className="my-10 w-1/4 m-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form className="my-10 flex flex-col" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-x-2">
          <Input
            value={formik.values.firstname}
            label="firstname"
            name="firstname"
            type="text"
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />

          <Input
            value={formik.values.lastname}
            label="lastname"
            name="lastname"
            type="text"
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </div>
        <Input
          value={formik.values.username}
          label="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Input
          value={formik.values.email}
          label="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          value={formik.values.password}
          label="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <button
          type="submit"
          disabled={!!Object.keys(formik.errors).length || !formik.isValid}
          className="rounded-full bg-black text-white px-8 py-3 disabled:opacity-25"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
