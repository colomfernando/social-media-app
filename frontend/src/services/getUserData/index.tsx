import axios from 'axios';

const getUserData = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};
export default getUserData;
