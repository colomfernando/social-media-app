import React, { useState } from 'react';
import { useFormik, FormikProps } from 'formik';
import Input from 'components/Input';
import { useNavigate } from 'react-router-dom';
import { ValuesFormLogin } from 'types';
import login from 'api/login';
import asyncWrapper from 'utils/asyncWrapper';
import validationSchema from './validationSchema';
import setCookie from 'utils/setCookie';

const initialValues = {
  email: '',
  password: '',
};

const FormLogin: React.FC = () => {
  const [errorLogin, setErrorLogin] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: ValuesFormLogin) => {
    const [error, token] = await asyncWrapper<string>(() => login(values));

    if (error) return setErrorLogin(error.message);
    if (token) {
      setCookie('auth-token', token, 24);
      navigate('/dashboard', { replace: true });
    }
  };

  const formik: FormikProps<ValuesFormLogin> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className="my-10 w-1/4 m-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form className="my-10 flex flex-col" onSubmit={formik.handleSubmit}>
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
        <div className="flex flex-col h-20 mt-4">
          <button
            type="submit"
            disabled={!!Object.keys(formik.errors).length || !formik.isValid}
            className="w-full rounded-full bg-black text-white px-8 py-3 disabled:opacity-25"
          >
            Submit
          </button>
          {errorLogin && (
            <div
              className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">{errorLogin}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
