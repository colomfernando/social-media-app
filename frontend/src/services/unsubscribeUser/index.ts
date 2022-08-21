import axios from 'axios';

const unsubscribeUser = async (userIdToUnsubscribe: string) => {
  try {
    const { data } = await axios.post(
      `/api/user/${userIdToUnsubscribe}/unsubscribe`
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default unsubscribeUser;
