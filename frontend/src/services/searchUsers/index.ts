import axios from 'axios';

export interface Params {
  user?: string;
}

const searchUsers = async (params: Params = {}) => {
  try {
    const { data } = await axios.get('/api/user', {
      params: { ...(params && { ...params }) },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default searchUsers;
