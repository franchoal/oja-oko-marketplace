import type { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "outline" | "danger";
}

const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "w-full rounded-lg py-3 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border border-green-600 bg-white text-green-600 hover:bg-green-50",

    danger:
      "border border-red-500 bg-white text-red-600 hover:bg-red-50",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;