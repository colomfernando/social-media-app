import React from 'react';
import Post, { PropsPost } from 'components/Post';

interface PropsPostList {
  posts: PropsPost[];
}

const PostList: React.FC<PropsPostList> = ({ posts }) => {
  if (!posts) return null;
  return (
    <ul className="flex flex-col justify-center items-center w-full">
      {posts.length &&
        posts.map((post) => (
          <li
            key={post.id}
            className="bg-white w-full  p-5 mb-4 last:mb-0 rounded-md"
          >
            <Post {...post} />
          </li>
        ))}
    </ul>
  );
};

export default PostList;
