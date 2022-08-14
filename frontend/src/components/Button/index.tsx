import React from 'react';

export interface PropsButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

const Button: React.FC<PropsButton> = ({ children, variant = 'contained' }) => {
  console.log('variant :>> ', variant);
  const stylesOutlined = ['focus:outline-none', 'bg-white'];
  const stylesContained = ['bg-stone-800', 'hover:bg-black'];

  const stylesByVariant =
    variant === 'outlined' ? stylesOutlined : stylesContained;

  return (
    <button
      className={`text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ${stylesByVariant.join(
        ' '
      )}`}
    >
      {children}
    </button>
  );
};

export default Button;
