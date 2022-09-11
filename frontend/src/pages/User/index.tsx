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
import getUserFollowers from 'services/getUserFollowers';
import getUserFollowing from 'services/getUserFollowing';
import Tabs from 'components/Tabs';
import UserCard from 'components/UserCard';

interface Data {
  user: UserType | Record<string, any>;
  posts: Post[] | [];
  followers: UserType[];
  following: UserType[];
}

const User: React.FC = () => {
  const { id: paramId } = useParams();
  if (!paramId) return null;
  const [data, setData] = useState<Data | Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const [, userData] = await asyncWrapper(() => getUserData(paramId));

    const [, dataPosts] = await asyncWrapper<Post[]>(() =>
      getPosts({ userId: paramId })
    );

    const [, followersData] = await asyncWrapper(() =>
      getUserFollowers(paramId)
    );

    const [, followingData] = await asyncWrapper(() =>
      getUserFollowing(paramId)
    );

    setData({
      ...data,
      user: userData || {},
      posts: dataPosts || [],
      followers: followersData || [],
      following: followingData || [],
    });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paramId]);

  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <UserHeader userData={data.user} />
            <Tabs titles={['Posts', 'Followers', 'Following']}>
              <PostList posts={data.posts} />
              <div>
                {data.followers.map((user: UserType) => (
                  <UserCard key={user.id} {...user} />
                ))}
              </div>
              <div>
                {data.following.map((user: UserType) => (
                  <UserCard key={user.id} {...user} />
                ))}
              </div>
            </Tabs>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default User;
