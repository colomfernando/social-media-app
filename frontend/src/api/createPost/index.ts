import axios from 'axios';
import { CreatePost } from 'types';
// !FIXME text vacío rompe
const register = async (values: CreatePost) => {
  try {
    const { data } = await axios.post('/api/post', {
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
