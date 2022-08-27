import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
}
const InputForm: React.FC<InputProps> = ({
  label,
  value,
  name,
  onChange,
  type,
  error,
}) => {
  return (
    <div className="mb-8 grow flex flex-col h-20">
      <label className="first-letter:uppercase" htmlFor={label}>
        {label}
      </label>
      <input
        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
        id={label}
        name={name}
        onChange={onChange}
        value={value}
        type={type}
      />
      {error && <span className="text-red-400 font-medium">{error}</span>}
    </div>
  );
};

export default InputForm;
