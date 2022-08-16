import React from 'react';
import { Link } from 'react-router-dom';

interface PropsAvatar extends React.HTMLAttributes<HTMLImageElement> {
  url: string;
  userId: number;
  size?: number;
  hasLink?: boolean;
}

const Avatar: React.FC<PropsAvatar> = ({
  url,
  size = 12,
  hasLink = true,
  userId,
  ...props
}) => {
  if (!url) return null;
  console.log('hasLink :>> ', hasLink);
  return (
    <Link className={`w-${size} h-${size}`} to={`/user/${userId}`}>
      <img {...props} className="rounded-full" src={url} alt="avatar" />
    </Link>
  );
};

export default Avatar;
