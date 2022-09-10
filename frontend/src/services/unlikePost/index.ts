import axios from 'axios';

export interface Params {
  postId: string;
}

const unlikePost = async (params: Params) => {
  try {
    const { postId } = params;

    const { data } = await axios.patch(`/api/post/${postId}/unlike`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return Promise.reject(error.response.data);
    }
  }
};

export default unlikePost;
