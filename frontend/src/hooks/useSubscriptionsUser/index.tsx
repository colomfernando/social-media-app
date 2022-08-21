import { useState } from 'react';
import subscribeUser from 'services/subscribeUser';
import unsubscribeUser from 'services/unsubscribeUser';
import asyncWrapper from 'utils/asyncWrapper';

type UserId = string;
type CbSuccess = () => void;
type CbError = (error: Error) => void;

interface useSubscriptionUser {
  isLoading: boolean;
  subscribe: (userId: UserId, cbSuccess?: CbSuccess, cbError?: CbError) => void;
  unsubscribe: (
    userId: UserId,
    cbSuccess?: CbSuccess,
    cbError?: CbError
  ) => void;
}

const useSubscriptionUser = (): useSubscriptionUser => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (
    userId: UserId,
    cbSuccess?: CbSuccess,
    cbError?: CbError
  ) => {
    setIsLoading(true);
    const [error] = await asyncWrapper(() => subscribeUser(String(userId)));
    if (error && cbError) {
      setIsLoading(false);
      return cbError(error);
    }

    if (cbSuccess) {
      setIsLoading(false);
      return cbSuccess();
    }
  };

  const unsubscribe = async (
    userId: UserId,
    cbSuccess?: CbSuccess,
    cbError?: CbError
  ) => {
    const [error] = await asyncWrapper(() => unsubscribeUser(String(userId)));
    if (error && cbError) {
      setIsLoading(false);
      return cbError(error);
    }

    if (cbSuccess) {
      setIsLoading(false);
      return cbSuccess();
    }
  };
  return { isLoading, subscribe, unsubscribe };
};

export default useSubscriptionUser;
