import React, { useState } from 'react';
import createPost from 'api/createPost';
import Button from 'components/Button';
import Avatar from 'components/Avatar';

export interface PropsCreatePost {
  cb: () => void;
  urlAvatar: string | undefined;
}

const CreatePost: React.FC<PropsCreatePost> = ({ cb, urlAvatar }) => {
  const [text, setText] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text.trim()) return null;
    createPost({ text });
    setText('');
    cb();
  };

  return (
    <div className="p-4 bg-white w-full flex p-5 mb-4  rounded-md">
      {urlAvatar && (
        <div className="mr-5">
          <Avatar size={100} urlAvatar={urlAvatar} />
        </div>
      )}
      <div className="flex flex-col w-full">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          onChange={handleOnChange}
          value={text}
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <Button customStyle="my-4 ml-auto" onClick={handleOnSubmit}>
          send
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
