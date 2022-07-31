import React from 'react';
import MainLayout from 'Layout/MainLayout';
import postMock from '../mocks/posts.json';
import Post from 'components/Post';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-10">
        <div className="flex flex-col justify-center items-center">
          {postMock.map((post, idx) => (
            <Post key={idx.toString()} {...post} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
