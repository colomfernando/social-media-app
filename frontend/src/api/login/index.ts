import axios from 'axios';
import { ValuesFormLogin } from 'types';

const register = async (values: ValuesFormLogin) => {
  try {
    const { data } = await axios.post('/api/login', {
      ...values,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default register;
