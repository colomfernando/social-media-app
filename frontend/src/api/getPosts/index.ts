import axios from 'axios';

const register = async () => {
  try {
    const { data } = await axios.get('/api/post');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default register;
