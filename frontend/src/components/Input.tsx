import React from 'react';

type Props = {
  name: string;
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({
  name,
  id,
  label,
  type = 'text',
  placeholder = '',
  value = '',
  className = '',
  onChange,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="price"
          className="leading-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id ?? name}
          placeholder={placeholder}
          value={value}
          className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
