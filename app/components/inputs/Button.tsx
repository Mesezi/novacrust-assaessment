import { LoaderCircle } from 'lucide-react';
import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary';
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean
    type?: 'submit' | 'button'
  }
  

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  isLoading = false,
  type="button",
  ...props
}) => {
    const baseStyles = `px-4 h-10 cursor-pointer rounded-full text-sm  font-normal hover:scale-[.99] ease-in-out duration-150 flex justify-center items-center gap-1 transition duration-300 ease-in-out disabled:opacity-80`;

  const variantStyles = {
  primary: `bg-primaryColor text-white  font-semibold disabled:opacity-50`,
};

  return (
    <button
    {...props}
    type={type}
      className={twMerge(baseStyles , variantStyles[variant] , className)}
    >
      {children} {isLoading && <LoaderCircle className="animate-spin ml-1" size={17}/> }
    </button>
  );
};

export default Button;
