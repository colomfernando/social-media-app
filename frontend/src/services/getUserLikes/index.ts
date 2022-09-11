import axios from 'axios';

const getUserLikes = async (id: string) => {
  try {
    const { data } = await axios.get(`/api/user/${id}/likes`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};
export default getUserLikes;
