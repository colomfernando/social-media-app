import React, { useState } from 'react';
import createPost from 'api/createPost';
import Button from 'components/Button';

export interface PropsCreatePost {
  cb: () => void;
}

const CreatePost: React.FC<PropsCreatePost> = ({ cb }) => {
  const [text, setText] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return null;
    createPost({ text });
    setText('');
    cb();
  };
  return (
    <div className="mb-4 flex flex-col">
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
  );
};

export default CreatePost;
