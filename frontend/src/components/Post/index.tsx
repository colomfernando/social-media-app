import React from 'react';
import Avatar from 'components/Avatar';
import LikeIcon from 'components/LikeIcon';
import getDifferenceHours from 'utils/getDifferenceHours';

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

  const hoursPosted = getDifferenceHours(timestamp);

  return (
    <article>
      <div className="flex">
        <Avatar userId={id} url={avatar} />
        <div className="flex flex-col w-full ml-4 mr-1">
          <div className="flex">
            <p className="font-bold mr-2">
              {`${firstname} ${lastname}`}
              <p className="text-gray-600 font-normal md:hidden">
                {`@${username}`}
                <span className="ml-1 text-black md:hidden">{` - ${hoursPosted}h`}</span>
              </p>
            </p>
            <p className="text-gray-600 hidden md:flex">{`@${username}`}</p>
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
