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
    return toast.success('Success');
  };

  const handleUnsubscribe = async () => {
    const [error] = await asyncWrapper(() => unsubscribeUser(String(id)));

    if (error) return toast.error(error.message);
    return toast.success('Success');
  };
  console.log('handleUnsubscribe :>> ', handleUnsubscribe);

  useEffect(() => {
    checkTypeSubscription();
  }, []);

  const typeSubscriptionMap = {
    unsubscribe: {
      cb: handleUnsubscribe,
      message: 'Unfollow',
    },
    subscribe: {
      cb: handleSubscribe,
      message: 'Follow',
    },
  };
  console.log('typeSub :>> ', typeSubscription);
  return (
    <div className="bg-white rounded-md p-5 mb-8">
      <Avatar size={100} urlAvatar={userData?.avatar} userId={userData.id} />
      <h3 className="text-xl font-bold mt-5 mb-1">{`${userData?.firstname} ${userData?.lastname}`}</h3>
      <p>{`@${userData?.username}`}</p>
      {!isSameUser() && typeSubscription && (
        <Button onClick={handleSubscribeUser} customStyle="ml-auto">
          {typeSubscriptionMap[typeSubscription]}
        </Button>
      )}
    </div>
  );
};

export default UserHeader;
