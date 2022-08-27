import React, { useEffect, useState } from 'react';
import MainLayout from 'Layout/MainLayout';
import PostList from 'components/PostList';
import getPosts from 'services/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import Loading from 'components/Loading';
import CreatePost from 'components/CreatePost';
import { Post } from 'types';
import { useSelector } from 'react-redux';
import { State } from 'store/types';

const Dashboard: React.FC = () => {
  const [postData, setPostData] = useState<[] | Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userData = useSelector((state: State) => state.user);

  const getData = async () => {
    const [, dataPosts] = await asyncWrapper<Post[]>(() => getPosts());

    if (dataPosts) setPostData([...dataPosts]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!userData) return null;

  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <CreatePost
              urlAvatar={userData.avatar}
              userId={String(userData.id)}
              cb={getData}
            />
            <PostList posts={postData} />
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Dashboard;
