import axios from 'axios';

const subscribeUser = async (userIdToSubscribe: string) => {
  try {
    const { data } = await axios.post(
      `/api/user/${userIdToSubscribe}/subscribe`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default subscribeUser;
