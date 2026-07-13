import type { ReactNode } from "react";

import QueryProvider from "./QueryProvider";
import ToastProvider from "./ToastProvider";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <ToastProvider />
      {children}
    </QueryProvider>
  );
};

export default AppProvider;