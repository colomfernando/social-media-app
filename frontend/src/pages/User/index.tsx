import React, { useState, useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import getPosts from 'api/getPosts';
import asyncWrapper from 'utils/asyncWrapper';
import PostList from 'components/PostList';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { Post, User as UserType } from 'types';
import getUserData from 'api/getUserData';
import Avatar from 'components/Avatar';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';

const User: React.FC = () => {
  const { id: userId } = useParams();
  if (!userId) return null;
  const [userData, setUserData] = useState<null | UserType>();
  const [postsData, setPostsData] = useState<[] | Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getPostsData = async () => {
    const [, userData] = await asyncWrapper(() => getUserData(userId));

    if (userData) setUserData(userData);
    const [, dataPosts] = await asyncWrapper<Post[]>(() =>
      getPosts({ userId })
    );

    if (dataPosts) setPostsData([...dataPosts]);
    setLoading(false);
  };

  useEffect(() => {
    getPostsData();
  }, []);

  if (!userData) return null;

  const data = [
    {
      label: 'Posts',
      value: 'html',
      component: <PostList posts={postsData} />,
    },
    {
      label: 'Followers',
      value: 'asdasdasdasd',
      component: <div>hola</div>,
    },
  ];

  return (
    <MainLayout>
      <section className="mt-5 mx-2 md:mx-auto md:w-5/6 lg:w-1/3 flex justify-center align-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full">
            <div className="bg-white rounded-md p-5 mb-8">
              <Avatar
                size="xxl"
                urlAvatar={userData?.avatar}
                userId={userData.id}
              />
              <h3 className="text-xl font-bold mt-5 mb-1">{`${userData?.firstname} ${userData?.lastname}`}</h3>
              <p>{`@${userData?.username}`}</p>
            </div>
            <Tabs value="html">
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  mount: { opacity: 100 },
                  unmount: { opacity: 0 },
                }}
              >
                {data.map(({ value, component }) => (
                  <TabPanel key={value} value={value}>
                    {component}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default User;
