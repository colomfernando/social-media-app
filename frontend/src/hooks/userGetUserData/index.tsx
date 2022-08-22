import { useState } from 'react';
import getUserData from 'services/getUserData';
import asyncWrapper from 'utils/asyncWrapper';
import getUserIdFromCookie from 'utils/getUserIdFromCookie';
import { useDispatch } from 'react-redux';
import { actionSetUser } from 'store/actions';
import { User } from 'types';

interface UseGetUserDataResponse {
  isLoadingUserData: boolean;
  saveUserInStore: (token: string) => Promise<string | null | undefined>;
}
const useGetUserData = (): UseGetUserDataResponse => {
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const dispatch = useDispatch();

  const saveUserInStore = async (token: string) => {
    setIsLoadingUserData(true);
    const userId = getUserIdFromCookie(token);
    if (!userId) {
      setIsLoadingUserData(false);
      return null;
    }

    const [, user] = await asyncWrapper<User>(() => getUserData(userId));

    if (user) dispatch(actionSetUser(user));

    setIsLoadingUserData(false);
  };
  return { isLoadingUserData, saveUserInStore };
};

export default useGetUserData;
