import React, { useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import asyncWrapper from 'utils/asyncWrapper';
import subscribeUser from 'services/subscribeUser';
import unsubscribeUser from 'services/unsubscribeUser';
import getUserFollowers from 'services/getUserFollowers';
import getUserId from 'utils/getUserId';
import { User } from 'types';
import { toast } from 'react-toastify';

interface PropsUserHeader {
  userData: User;
}

interface KeySubscriptionMap {
  message: string;
  cb: () => void;
}
interface TypeSubscriptionMap {
  [index: string]: KeySubscriptionMap;
}

const UserHeader: React.FC<PropsUserHeader> = ({ userData }) => {
  if (!userData) return null;

  const [typeSubscription, setTypeSubscription] = useState('');

  const { id } = userData;

  const userIdLogged = getUserId();

  const isSameUser = (): boolean => {
    return userIdLogged === String(id);
  };

  const checkTypeSubscription = async () => {
    const [error, data] = await asyncWrapper(() =>
      getUserFollowers(String(id))
    );
    if (error || !data) return setTypeSubscription('');
    if (!data.length) setTypeSubscription('subscribe');

    const userLoggedIsSubscribed = data.some(
      (user) => String(user.id) === userIdLogged
    );

    if (userLoggedIsSubscribed) return setTypeSubscription('unsubscribe');
    return setTypeSubscription('subscribe');
  };

  const handleSubscribe = async () => {
    const [error] = await asyncWrapper(() => subscribeUser(String(id)));

    if (error) return toast.error(error.message);

    return toast.success('Success', {
      onClose: () => setTypeSubscription('unsubscribe'),
    });
  };

  const handleUnsubscribe = async () => {
    const [error] = await asyncWrapper(() => unsubscribeUser(String(id)));

    if (error) return toast.error(error.message);

    return toast.success('Success', {
      onClose: () => setTypeSubscription('subscribe'),
    });
  };

  useEffect(() => {
    checkTypeSubscription();
  }, []);

  const typeSubscriptionMap: TypeSubscriptionMap = {
    unsubscribe: {
      cb: handleUnsubscribe,
      message: 'Unfollow',
    },
    subscribe: {
      cb: handleSubscribe,
      message: 'Follow',
    },
  };

  return (
    <div className="bg-white rounded-md p-5 mb-8">
      <Avatar size={100} urlAvatar={userData?.avatar} userId={userData.id} />
      <h3 className="text-xl font-bold mt-5 mb-1">{`${userData?.firstname} ${userData?.lastname}`}</h3>
      <p>{`@${userData?.username}`}</p>
      {!isSameUser() && typeSubscription && (
        <Button
          onClick={typeSubscriptionMap[typeSubscription].cb}
          customStyle="ml-auto"
        >
          {typeSubscriptionMap[typeSubscription].message}
        </Button>
      )}
    </div>
  );
};

export default UserHeader;
