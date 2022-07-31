import React from 'react';
import Avatar from 'components/Avatar';
import LikeIcon from 'components/LikeIcon';
import getDifferenceHours from 'utils/getDifferenceHours';

interface PropsPost {
  text: string;
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

  const hoursPosted = getDifferenceHours(timestamp);

  return (
    <article className="bg-white w-1/2 p-5 mb-4 last:mb-0 rounded-md">
      <div className="flex">
        <Avatar userId={id} url={avatar} />
        <div className="flex flex-col w-full ml-4 mr-1">
          <div className="flex">
            <p className="font-bold mr-2">{`${firstname} ${lastname}`}</p>
            <p className="text-gray-600">{`@${username}`}</p>
            <span className="ml-1">{` - ${hoursPosted}h`}</span>
            <LikeIcon likes={likes} />
          </div>
          <p className="mt-3 pr-10">{text}</p>
        </div>
      </div>
    </article>
  );
};

export default Post;
