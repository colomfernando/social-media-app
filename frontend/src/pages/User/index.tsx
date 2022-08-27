import React, { useState, useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import getPosts from 'services/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import PostList from 'components/PostList';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { Post, User as UserType } from 'types';
import getUserData from 'services/getUserData';
import UserHeader from 'components/UserHeader';

const User: React.FC = () => {
  const { id: paramId } = useParams();
  if (!paramId) return null;
  const [userData, setUserData] = useState<null | UserType>();
  const [postsData, setPostsData] = useState<[] | Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const [, userData] = await asyncWrapper(() => getUserData(paramId));

    if (userData) setUserData(userData);
    const [, dataPosts] = await asyncWrapper<Post[]>(() =>
      getPosts({ userId: paramId })
    );

    if (dataPosts) setPostsData([...dataPosts]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paramId]);

  if (!userData) return null;

  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <UserHeader userData={userData} />
            <PostList posts={postsData} />
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default User;
