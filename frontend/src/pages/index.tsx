import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-0 w-screen h-screen flex justify-center items-center">
      <div className="p-6 max-w-3xl bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-5xl font-bold text-center">Fake social media</h2>
        <div className="inline-flex rounded-md shadow-sm mt-8" role="group">
          <Button variant="outlined" onClick={() => navigate('/register')}>
            Register
          </Button>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
