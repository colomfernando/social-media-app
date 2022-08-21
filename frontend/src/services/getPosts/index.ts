import axios from 'axios';

export interface Params {
  userId?: string;
}

const getPosts = async (params: Params = {}) => {
  try {
    const { data } = await axios.get('/api/post', {
      params: { ...(params && { ...params }) },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default getPosts;
