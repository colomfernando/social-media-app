import React from 'react';
import Post from 'components/Post';
import { Post as PropsPost } from 'types';

interface PropsPostList {
  posts: PropsPost[];
}

const PostList: React.FC<PropsPostList> = ({ posts }) => {
  if (!posts.length) return null;
  return (
    <ul className="flex bg-white flex-col justify-center items-center  divide-y">
      {posts.length &&
        posts.map((post) => (
          <li key={post.id} className="p-4 bg-white w-full flex p-5">
            <Post {...post} />
          </li>
        ))}
    </ul>
  );
};

export default PostList;
