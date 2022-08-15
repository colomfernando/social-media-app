import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-0 flex">
      <div
        className="w-2/3  h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: 'url(/assets/bg-home.jpg)' }}
      />
      <div className="w-1/3 bg-white h-screen flex items-center">
        <div className="p-6 w-2/5 flex flex-col">
          <h3 className="text-5xl mb-10 font-bold">Join today</h3>
          <Button
            customStyle="mb-5"
            variant="outlined"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
