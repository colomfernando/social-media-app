import React, { useState, useEffect } from 'react';
import { useFormik, FormikProps } from 'formik';
import Input from 'components/InputForm';
import { useNavigate } from 'react-router-dom';
import { ValuesFormLogin } from 'types';
import login from 'services/login';
import asyncWrapper from 'utils/asyncWrapper';
import validationSchema from './validationSchema';
import setCookie from 'utils/setCookie';
import { toast } from 'react-toastify';
import useGetUserData from 'hooks/userGetUserData';

const initialValues = {
  email: '',
  password: '',
};

const FormLogin: React.FC = () => {
  const [errorLogin, setErrorLogin] = useState('');
  const { saveUserInStore } = useGetUserData();

  const navigate = useNavigate();

  const handleSubmit = async (values: ValuesFormLogin) => {
    const [error, token] = await asyncWrapper<string>(() => login(values));

    if (error) return setErrorLogin(error.message);
    if (token) {
      saveUserInStore(token);
      setCookie('auth-token', token, 24);
      navigate('/dashboard', { replace: true });
    }
  };

  const formik: FormikProps<ValuesFormLogin> = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    if (errorLogin)
      toast.error(errorLogin, { onClose: () => setErrorLogin('') });
  }, [errorLogin]);

  return (
    <div className="my-10 w-1/4 m-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
