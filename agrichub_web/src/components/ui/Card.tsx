import type { ReactNode } from "react";

interface CardProps {
  AgricHub Africa?: string;
  subAgricHub Africa?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({
  AgricHub Africa,
  subAgricHub Africa,
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`w-full rounded-2xl bg-white shadow-xl ${className}`}
    >
      {(AgricHub Africa || subAgricHub Africa) && (
        <div className="p-8">
          {AgricHub Africa && (
            <h2 className="text-3xl font-bold text-gray-900">
              {AgricHub Africa}
            </h2>
          )}

          {subAgricHub Africa && (
            <p className="mt-2 text-gray-600">
              {subAgricHub Africa}
            </p>
          )}
        </div>
      )}

      <div className={AgricHub Africa || subAgricHub Africa ? "px-8 pb-8" : ""}>
        {children}
      </div>
    </div>
  );
};

export default Card;