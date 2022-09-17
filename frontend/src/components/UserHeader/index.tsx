import React, { useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import asyncWrapper from 'utils/asyncWrapper';
import getUserFollowers from 'services/getUserFollowers';
import getUserId from 'utils/getUserId';
import useSubscriptionUser from 'hooks/useSubscriptionsUser';
import { User } from 'types';
import { toast } from 'react-toastify';

interface PropsUserHeader {
  userData: User;
  totalFollowers: number;
  totalFollowing: number;
  totalLikes: number;
}

interface KeySubscriptionMap {
  message: string;
  cb: () => void;
}
interface TypeSubscriptionMap {
  [index: string]: KeySubscriptionMap;
}

const UserHeader: React.FC<PropsUserHeader> = ({
  userData,
  totalFollowers,
  totalFollowing,
  totalLikes,
}) => {
  if (!userData) return null;

  const { subscribe, unsubscribe } = useSubscriptionUser();
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
    subscribe(
      String(id),
      () => {
        toast.success(`Following @${userData?.username}`);
        setTypeSubscription('unsubscribe');
      },
      (error) => toast.error(error.message)
    );
  };

  const handleUnsubscribe = () => {
    return unsubscribe(
      String(id),
      () => {
        toast.success(`Unfollow @${userData?.username}`);
        setTypeSubscription('subscribe');
      },
      (error) => toast.error(error.message)
    );
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
      <Avatar
        size={100}
        urlAvatar={userData?.avatar}
        userId={String(userData.id)}
      />
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
      <div className="flex mt-5 space-x-3">
        <p>{`Followers: ${totalFollowers}`}</p>
        <p>{`Following: ${totalFollowing}`}</p>
        <p>{`Likes: ${totalLikes}`}</p>
      </div>
    </div>
  );
};

export default UserHeader;
