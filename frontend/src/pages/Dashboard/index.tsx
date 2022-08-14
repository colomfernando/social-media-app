import React, { useEffect, useState } from 'react';
import MainLayout from 'Layout/MainLayout';
import PostList from 'components/PostList';
import mockPost from '../../mocks/posts.json';
import getPosts from 'api/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import Loading from 'components/Loading';
import { Post } from 'types';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<[] | Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPostsData = async () => {
    const [, dataPosts] = await asyncWrapper<Post[]>(() => getPosts());

    if (dataPosts) setData([...dataPosts, ...mockPost]);
    setLoading(false);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <MainLayout>
      <section className="mt-5 mx-auto w-5/6  lg:w-1/3 flex justify-center align-center">
        {loading ? <Loading /> : <PostList posts={data} />}
      </section>
    </MainLayout>
  );
};

export default Dashboard;
