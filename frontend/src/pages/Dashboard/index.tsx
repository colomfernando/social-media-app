import React, { useEffect, useState } from 'react';
import MainLayout from 'Layout/MainLayout';
import PostList from 'components/PostList';
import getPosts from 'api/getPosts';
import getUserData from 'api/getUserData';
import asyncWrapper from 'utils/asyncWrapper';
import Loading from 'components/Loading';
import CreatePost from 'components/CreatePost';
import { Post, User as UserType } from 'types';
import getUserIdFromCookie from 'utils/getUserIdFromCookie';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<null | UserType>();
  const [postData, setPostData] = useState<[] | Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const userId = getUserIdFromCookie();
    if (!userId) return null;

    const [, user] = await asyncWrapper(() => getUserData(userId));
    if (user) setUserData(user);

    const [, dataPosts] = await asyncWrapper<Post[]>(() => getPosts());

    if (dataPosts) setPostData([...dataPosts]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <CreatePost
              urlAvatar={userData?.avatar}
              userId={userData?.id}
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
