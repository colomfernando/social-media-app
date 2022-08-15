import React from 'react';

export interface PropsButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  customStyle?: string;
}

const Button: React.FC<PropsButton> = ({
  children,
  variant = 'contained',
  customStyle,
  ...props
}) => {
  const stylesOutlined = [
    'focus:outline-none',
    'bg-white',
    'text-gray-900',
    'border',
    'border-gray-200',
    'hover:bg-gray-100 ',
    'focus:ring-gray-200',
    'focus:z-10',
  ];
  const stylesContained = [
    'border-0',
    'text-white',
    'hover:bg-stone-700',
    'bg-black',
    'focus:ring-blue-300',
  ];

  const stylesByVariant =
    variant === 'outlined' ? stylesOutlined : stylesContained;

  return (
    <button
      className={`flex justify-center focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 ${stylesByVariant.join(
        ' '
      )} ${customStyle}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
