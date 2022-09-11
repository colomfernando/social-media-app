/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import getPosts from 'services/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import PostList from 'components/PostList';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { Post, User as UserType } from 'types';
import UserHeader from 'components/UserHeader';
import getUserData from 'services/getUserData';
import getUserFollowers from 'services/getUserFollowers';
import getUserFollowing from 'services/getUserFollowing';
import getUserLikes from 'services/getUserLikes';
import Tabs from 'components/Tabs';
import UserCard from 'components/UserCard';

interface Data {
  user: UserType | Record<string, any>;
  posts: Post[] | [];
  likes: Post[] | [];
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

    const [, userLikes] = await asyncWrapper(() => getUserLikes(paramId));

    setData({
      ...data,
      user: userData || {},
      posts: dataPosts || [],
      likes: userLikes || [],
      followers: followersData || [],
      following: followingData || [],
    });

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [paramId]);

  const EmptyMessage = () => (
    <div className="flex p-5 items-center justify-center">
      <p>Nothing Here</p>
    </div>
  );
  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <UserHeader
              userData={data.user}
              totalFollowers={data.followers.length}
              totalFollowing={data.following.length}
              totalLikes={data.likes.length}
            />
            <Tabs titles={['Posts', 'Followers', 'Following', 'Likes']}>
              {data.posts.length ? (
                <PostList posts={data.posts} />
              ) : (
                EmptyMessage()
              )}
              <div>
                {data.followers.length
                  ? data.followers.map((user: UserType) => (
                      <UserCard key={user.id} {...user} />
                    ))
                  : EmptyMessage()}
              </div>
              <div>
                {data.following.length
                  ? data.following.map((user: UserType) => (
                      <UserCard key={user.id} {...user} />
                    ))
                  : EmptyMessage()}
              </div>
              <div>
                <PostList posts={data.likes} />
              </div>
            </Tabs>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default User;
