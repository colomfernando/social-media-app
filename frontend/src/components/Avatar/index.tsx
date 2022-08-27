import React from 'react';
import { Link } from 'react-router-dom';

interface PropsAvatar extends React.HTMLAttributes<HTMLImageElement> {
  urlAvatar: string;
  userId?: string;
  size?: number;
}

const Avatar: React.FC<PropsAvatar> = ({
  urlAvatar,
  size = 45,
  userId,
  ...props
}) => {
  if (!urlAvatar) return null;

  const renderImg = () => (
    <img
      {...props}
      className={`rounded-full`}
      style={{ width: `${size}px`, height: `${size}px` }}
      src={urlAvatar}
      alt="avatar"
    />
  );

  if (userId) return <Link to={`/user/${userId}`}>{renderImg()}</Link>;

  return <>{renderImg()}</>;
};

export default Avatar;
