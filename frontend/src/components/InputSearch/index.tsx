import React, { useState } from 'react';
import Button from 'components/Button';
import asyncWrapper from 'utils/asyncWrapper';
import searchUsers from 'services/searchUsers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const InputSearch: React.FC = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!value) return null;
    const [error, user] = await asyncWrapper(() =>
      searchUsers({ user: value })
    );

    if (error) return toast.error(error.message);
    if (!user) return null;

    if (user.length === 1) return navigate(`/user/${user[0].id}`);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div className="flex w-1/5">
      <input
        className="w-full border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow mr-3 "
        onChange={handleOnChange}
        value={value}
        placeholder="Search user"
      />
      <Button disabled={!value} onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default InputSearch;
