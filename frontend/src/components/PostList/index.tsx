import React from 'react';
import Post, { PropsPost } from 'components/Post';

interface PropsPostList {
  posts: PropsPost[];
}

const PostList: React.FC<PropsPostList> = ({ posts }) => {
  if (!posts.length) return null;
  return (
    <ul className="flex bg-white p-3 flex-col justify-center items-center w-full divide-y rounded-md">
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
