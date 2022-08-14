import React from 'react';
import MainLayout from 'Layout/MainLayout';
import postMock from '../../mocks/posts.json';
import PostList from 'components/PostList';
import getPosts from 'api/getPosts';
import asyncWrapper from 'utils/asyncWrapper';

const Dashboard: React.FC = () => {
  const getPostsData = async () => {
    const [errorPosts, dataPosts] = await asyncWrapper(() => getPosts());
    console.log('errorPosts :>> ', errorPosts);
    console.log('dataPosts :>> ', dataPosts);
  };

  getPostsData();
  return (
    <MainLayout>
      <section className="mt-5  mx-auto w-5/6  lg:w-1/3 flex">
        <PostList posts={postMock} />
      </section>
    </MainLayout>
  );
};

export default Dashboard;
