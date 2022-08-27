import React, { useCallback, useEffect, useState } from 'react';
import Button from 'components/Button';
import asyncWrapper from 'utils/asyncWrapper';
import searchUsers from 'services/searchUsers';
import { toast } from 'react-toastify';
import SearchIcon from 'components/SearchIcon';
import { User } from 'types';
import UserCard from 'components/UserCard';

const InputSearch: React.FC = () => {
  const [value, setValue] = useState('');
  const [usersResults, setUsersResults] = useState<[] | User[]>([]);

  const handleSearch = async () => {
    if (!value) return null;

    const [error, users] = await asyncWrapper<User[]>(() =>
      searchUsers({ user: value })
    );

    if (error) return toast.error(error.message);

    if (!users) return null;
    if (!users.length) return toast.error('no user found');

    setUsersResults(users);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setUsersResults([]);
  };

  useEffect(() => {
    return () => setUsersResults([]);
  }, []);

  const handleCloseResult = useCallback(() => setUsersResults([]), []);

  return (
    <div className="flex w-1/5 bg-white relative">
      <input
        className="w-full px-3 focus:outline-none"
        onChange={handleOnChange}
        value={value}
        placeholder="Search user"
        onKeyDown={handleOnKeyDown}
      />

      <Button
        baseButton
        customStyle="mr-3"
        disabled={!value}
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
      {!!usersResults.length && (
        <div className="w-full bg-white absolute top-full drop-shadow-lg border-t-2 border-t-gray-200 p-3">
          <ul className="divide-y">
            {usersResults.map((user) => (
              <li key={user.id}>
                <UserCard {...user} cb={handleCloseResult} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
