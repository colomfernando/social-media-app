import React from 'react';
import { Avatar as AvatarComponent } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

interface PropsAvatar extends React.HTMLAttributes<HTMLImageElement> {
  urlAvatar: string;
  userId?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Avatar: React.FC<PropsAvatar> = ({
  urlAvatar,
  size = 'md',
  userId,
  ...props
}) => {
  if (!urlAvatar) return null;

  const renderImg = () => (
    <AvatarComponent
      {...props}
      size={size}
      src={urlAvatar}
      alt="avatar"
      variant="circular"
    />
  );

  if (userId) return <Link to={`/user/${userId}`}>{renderImg()}</Link>;

  return <>{renderImg()}</>;
};

export default Avatar;
