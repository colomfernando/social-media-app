import React from 'react';
import Post, { PropsPost } from 'components/Post';

interface PropsPostList {
  posts: PropsPost[];
}

const PostList: React.FC<PropsPostList> = ({ posts }) => {
  if (!posts) return null;
  return (
    <ul className="flex flex-col justify-center items-center w-full">
      {posts.length && posts.map((post) => <Post key={post.id} {...post} />)}
    </ul>
  );
};

export default PostList;
