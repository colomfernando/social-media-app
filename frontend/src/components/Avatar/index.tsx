import React from 'react';
import { Link } from 'react-router-dom';

interface PropsAvatar extends React.HTMLAttributes<HTMLImageElement> {
  url: string;
  userId: number;
  size?: number;
}

const Avatar: React.FC<PropsAvatar> = ({
  url,
  size = 45,

  userId,
  ...props
}) => {
  if (!url) return null;

  return (
    <Link to={`/user/${userId}`}>
      <img
        {...props}
        className={`rounded-full`}
        style={{ width: `${size}px` }}
        src={url}
        alt="avatar"
      />
    </Link>
  );
};

export default Avatar;
