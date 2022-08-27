import React from 'react';
import Avatar from 'components/Avatar';
import { Link } from 'react-router-dom';

interface PropsUserCard {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
}
const UserCard: React.FC<PropsUserCard> = ({
  id,
  username,
  firstname,
  lastname,
  avatar,
}) => {
  return (
    <div className="flex w-full px-2 py-3">
      <div className="flex">
        <Avatar size={45} urlAvatar={avatar} />
      </div>
      <Link to={`/user/${id}`} className="flex flex-col ml-4">
        <p className="font-bold">{`@${username}`}</p>
        <p className="text-gray-600">{`${firstname} ${lastname}`}</p>
      </Link>
    </div>
  );
};

export default UserCard;
