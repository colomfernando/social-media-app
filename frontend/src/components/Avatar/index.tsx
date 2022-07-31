import React from 'react';
import { Link } from 'react-router-dom';

interface PropsAvatar extends React.HTMLAttributes<HTMLImageElement> {
  url: string;
  userId: number;
}

const Avatar: React.FC<PropsAvatar> = ({ url, userId, ...props }) => {
  if (!url) return null;

  return (
    <Link className="w-12 h-12" to={`/user/${userId}`}>
      <img {...props} className="rounded-full" src={url} alt="avatar" />
    </Link>
  );
};

export default Avatar;
