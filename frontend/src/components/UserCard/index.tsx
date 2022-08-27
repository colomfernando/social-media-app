import React from 'react';
import Avatar from 'components/Avatar';
import { useNavigate } from 'react-router-dom';

interface PropsUserCard {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar: string;
  cb?: () => void;
}
const UserCard: React.FC<PropsUserCard> = ({
  id,
  username,
  firstname,
  lastname,
  avatar,
  cb,
}) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/user/${id}`);
    if (cb) return cb();
  };

  return (
    <div className="flex w-full px-2 py-3">
      <div className="flex">
        <Avatar size={45} urlAvatar={avatar} />
      </div>
      <a onClick={handleOnClick} className="flex flex-col ml-4 cursor-pointer">
        <p className="font-bold">{`@${username}`}</p>
        <p className="text-gray-600">{`${firstname} ${lastname}`}</p>
      </a>
    </div>
  );
};

export default UserCard;
