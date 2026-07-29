import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8FCF5] via-white to-[#EEF8E9]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-10">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;