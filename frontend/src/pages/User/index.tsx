/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import getPosts from 'services/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import PostList from 'components/PostList';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { Post, User as UserType } from 'types';
import UserHeader from 'components/UserHeader';
import getUserData from 'services/getUserData';
import getUserFollowers from 'services/getUserFollowers';
import getUserFollowing from 'services/getUserFollowing';
import getUserLikes from 'services/getUserLikes';
import Tabs from 'components/Tabs';
import UserCard from 'components/UserCard';
import ErrorBoundary from 'components/ErrorBoundary';

interface Data {
  user: UserType | Record<string, any>;
  posts: Post[] | [];
  likes: Post[] | [];
  followers: UserType[];
  following: UserType[];
}

const TabsTitle = ['Posts', 'Followers', 'Following', 'Likes'];

const User: React.FC = () => {
  const { id: paramId } = useParams();
  const [query, setQuery] = useSearchParams();

  if (!paramId) return null;
  const [data, setData] = useState<Data | Record<string, any>>({
    user: {},
    posts: [],
    likes: [],
    followers: [],
    following: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [defaultTab, setDefaultTab] = useState<number | null>(null);

  const getData = async () => {
    setLoading(true);

    const [userError, userData] = await asyncWrapper(() =>
      getUserData(paramId)
    );

    if (userError || !userData) {
      setLoading(false);
      return setError(true);
    }

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

  const selectTab = () => {
    if (loading || error) return null;

    const actualTab = query.get('tab');
    const actualIndexTab = TabsTitle.findIndex((tab) => tab === actualTab);
    if (actualIndexTab > -1) setDefaultTab(actualIndexTab);
    return null;
  };

  useEffect(() => {
    getData();
  }, [paramId]);

  useEffect(() => {
    selectTab();
  }, [loading]);

  const EmptyMessage = (message = 'Nothing Here') => (
    <div className="flex p-5 items-center justify-center">
      <p>{message}</p>
    </div>
  );

  const handleOnClickTab = (selectedIndex: number) => {
    const tabTitle = TabsTitle[selectedIndex];
    setQuery(`tab=${tabTitle}`);
  };

  if (error)
    return <MainLayout>{EmptyMessage('Something went wrong')}</MainLayout>;

  return (
    <MainLayout>
      <ErrorBoundary>
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

              <Tabs
                onSelect={handleOnClickTab}
                titles={TabsTitle}
                selectedTab={defaultTab}
              >
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
                  {data.likes.length ? (
                    <PostList posts={data.likes} />
                  ) : (
                    EmptyMessage()
                  )}
                </div>
              </Tabs>
            </div>
          )}
        </section>
      </ErrorBoundary>
    </MainLayout>
  );
};

export default User;
