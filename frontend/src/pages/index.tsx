import React from 'react';
import MainLayout from 'Layout/MainLayout';
import postMock from '../mocks/posts.json';
import PostList from 'components/PostList';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <section className="mt-5  mx-auto w-5/6  lg:w-1/3 flex">
        <PostList posts={postMock} />
      </section>
    </MainLayout>
  );
};

export default Home;
