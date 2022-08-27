import React from 'react';
import Avatar from 'components/Avatar';
import LikeIcon from 'components/LikeIcon';
import { Link } from 'react-router-dom';
import getDifferenceTimestamp from 'utils/getDifferenceTimestamp';

export interface PropsPost {
  text: string;
  id: string;
  likes: number;
  timestamp: number;
  user: {
    id: string;
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
    <article className="bg-white w-full flex">
      <div className="basis-14">
        <Avatar userId={id} urlAvatar={avatar} />
      </div>
      <div className="flex flex-col w-full ml-4 mr-1">
        <div className="flex">
          <Link to={`/user/${id}`} className="flex">
            <p className="font-bold mr-2">{`${firstname} ${lastname}`}</p>
            <p className="text-gray-600 hidden md:flex">{`@${username}`}</p>
          </Link>
          <span className="ml-1">{` · ${hoursPosted}`}</span>
          <LikeIcon likes={likes} />
        </div>
        <p className="mt-3">{text}</p>
      </div>
    </article>
  );
};

export default Post;
