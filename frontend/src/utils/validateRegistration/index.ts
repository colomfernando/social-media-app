import * as Yup from 'yup';

const validateRegistration = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default validateRegistration;
