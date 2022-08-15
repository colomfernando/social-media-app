import React from 'react';
import Avatar from 'components/Avatar';
import LikeIcon from 'components/LikeIcon';
import { Link } from 'react-router-dom';
import getDifferenceTimestamp from 'utils/getDifferenceTimestamp';

export interface PropsPost {
  text: string;
  id: number;
  likes: number;
  timestamp: number;
  user: {
    id: number;
    avatar: string;
    firstname: string;
    lastname: string;
    username: string;
  };
}

const Post: React.FC<PropsPost> = ({ text, user, likes, timestamp }) => {
  const { avatar, firstname, lastname, username, id } = user;

  const hoursPosted = getDifferenceTimestamp(timestamp);

  return (
    <li className="bg-white w-full flex p-5 mb-4 last:mb-0 rounded-md">
      <Avatar userId={id} url={avatar} />
      <div className="flex flex-col w-full ml-4 mr-1">
        <div className="flex">
          <Link to={`/user/${id}`} className="flex">
            <p className="font-bold mr-2">{`${firstname} ${lastname}`}</p>
            <p className="text-gray-600 hidden md:flex">{`@${username}`}</p>
          </Link>
          <span className="ml-1">{` - ${hoursPosted}`}</span>
          <LikeIcon likes={likes} />
        </div>
        <p className="mt-3 pr-10">{text}</p>
      </div>
    </li>
  );
};

export default Post;
