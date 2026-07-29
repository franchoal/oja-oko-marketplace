import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            {...props}
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-3.5
              text-gray-900
              placeholder:text-gray-400
              transition-all
              duration-200
              outline-none

              ${
                leftIcon
                  ? "pl-12"
                  : "pl-4"
              }

              ${
                rightIcon
                  ? "pr-12"
                  : "pr-4"
              }

              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-gray-200 focus:border-green-600 focus:ring-4 focus:ring-green-100"
              }

              disabled:cursor-not-allowed
              disabled:bg-gray-100
              disabled:text-gray-500

              ${className}
            `}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;