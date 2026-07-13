import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({
  title,
  subtitle,
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`w-full rounded-2xl bg-white shadow-xl ${className}`}
    >
      {(title || subtitle) && (
        <div className="p-8">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={title || subtitle ? "px-8 pb-8" : ""}>
        {children}
      </div>
    </div>
  );
};

export default Card;