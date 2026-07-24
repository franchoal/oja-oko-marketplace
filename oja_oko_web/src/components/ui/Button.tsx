import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?:
    | "primary"
    | "outline"
    | "danger"
    | "secondary";
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-2xl
    px-6
    py-3.5
    font-semibold
    transition-all
    duration-200
    active:scale-[0.98]
    disabled:cursor-not-allowed
    disabled:opacity-60
  `;

  const variants = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow-md",

    outline:
      "border border-green-600 bg-white text-green-700 hover:bg-green-50",

    danger:
      "border border-red-500 bg-white text-red-600 hover:bg-red-50",

    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />

            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          Loading...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;