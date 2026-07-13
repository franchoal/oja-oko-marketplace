import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full rounded-lg bg-green-600 py-3 text-white font-semibold
      hover:bg-green-700 transition
      disabled:opacity-60 disabled:cursor-not-allowed
      ${className}`}
    >
      {isLoading ? "Creating account..." : children}
    </button>
  );
};

export default Button;