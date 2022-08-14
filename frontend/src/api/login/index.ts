import axios from 'axios';
import { ValuesFormRegister } from 'types';

const login = async (values: ValuesFormRegister) => {
  try {
    const { data } = await axios.post('/api/register', {
      ...values,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data)
      return error.response.data;
  }
};

export default login;
