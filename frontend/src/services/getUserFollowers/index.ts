import axios from 'axios';
import { User } from 'types';

const getUserFollowers = async (userId: string) => {
  try {
    const { data } = await axios.get<User[] | []>(
      `/api/user/${userId}/followers`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default getUserFollowers;
