import React, { useEffect, useState } from 'react';
import Avatar from 'components/Avatar';
import LikeIcon from 'components/LikeIcon';
import { Link } from 'react-router-dom';
import { Post as PropsPost } from 'types';
import getDifferenceTimestamp from 'utils/getDifferenceTimestamp';
import getUserId from 'utils/getUserId';
import likePost from 'services/likePost';
import unlikePost from 'services/unlikePost';
import { toast } from 'react-toastify';
import asyncWrapper from 'utils/asyncWrapper';

const Post: React.FC<PropsPost> = ({
  id,
  text,
  user,
  likes,
  likes_count,
  timestamp,
}) => {
  const { avatar, firstname, lastname, username, id: userId } = user;
  const [likesCount, setLikesCount] = useState(likes_count);
  const [likeAction, setLikeAction] = useState('');
  const [hasUserLikePost, setHasUserLikePost] = useState(false);

  const hoursPosted = getDifferenceTimestamp(timestamp);
  const userLoggedId = getUserId();

  const actionPost = hasUserLikePost ? unlikePost : likePost;

  const handleClickPost = async () => {
    if (userId === userLoggedId) return null;

    const [, errorAction] = await asyncWrapper(() =>
      actionPost({ postId: id })
    );

    if (errorAction) {
      return toast.error(errorAction.message);
    }

    if (!hasUserLikePost) {
      setLikesCount((prevLikes) => prevLikes + 1);
      setHasUserLikePost(true);
    }

    if (hasUserLikePost && likesCount > 0) {
      setLikesCount((prevLikes) => prevLikes - 1);
      setHasUserLikePost(false);
    }
  };

  useEffect(() => {
    setHasUserLikePost(likes.some((id) => String(id) === userLoggedId));

    setLikesCount(likes_count);
    setLikeAction(hasUserLikePost ? 'unlike' : 'like');
  }, []);

  return (
    <article className="bg-white w-full flex">
      <div className="basis-14">
        <Avatar userId={userId} urlAvatar={avatar} />
      </div>
      <div className="flex flex-col w-full ml-4 mr-1">
        <div className="flex">
          <Link to={`/user/${userId}`} className="flex">
            <p className="font-bold mr-2">{`${firstname} ${lastname}`}</p>
            <p className="text-gray-600 hidden md:flex">{`@${username}`}</p>
          </Link>
          <span className="ml-1">{` · ${hoursPosted}`}</span>
          {likeAction && (
            <LikeIcon
              disabled={userId === userLoggedId}
              cb={handleClickPost}
              likes={likesCount}
              hasFill={hasUserLikePost}
            />
          )}
        </div>
        <p className="mt-3">{text}</p>
      </div>
    </article>
  );
};

export default Post;
