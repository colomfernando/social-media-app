import React from 'react';

interface PropsLikeIcon {
  likes: number;
  hasFill?: boolean;
}
const LikeIcon: React.FC<PropsLikeIcon> = ({ likes, hasFill }) => {
  const fill = { fill: hasFill ? '#000' : 'transparent' };
  return (
    <div className="flex justify-center items-center ml-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 50 50"
        viewBox="0 0 50 50"
        width={16}
        height={16}
      >
        <path
          {...fill}
          strokeWidth={2}
          stroke="#000"
          d="M24.85 10.126c2.018-4.783 6.628-8.125 11.99-8.125 7.223 0 12.425 6.179 13.079 13.543 0 0 .353 1.828-.424 5.119-1.058 4.482-3.545 8.464-6.898 11.503L24.85 48 7.402 32.165c-3.353-3.038-5.84-7.021-6.898-11.503-.777-3.291-.424-5.119-.424-5.119C.734 8.179 5.936 2 13.159 2c5.363 0 9.673 3.343 11.691 8.126z"
        ></path>
      </svg>
      <span className="ml-3 text-sm">{likes}</span>
    </div>
  );
};

export default LikeIcon;
