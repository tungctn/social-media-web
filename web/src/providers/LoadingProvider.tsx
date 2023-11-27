"use client";

import Loading from "@/components/Loading";
import { ReactNode, createContext, useState } from "react";

export const LoadingContext = createContext({
  setIsLoading: Function as any,
  isLoading: false,
});

type LoadingProviderProps = {
  children: ReactNode;
};

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setIsLoading, isLoading }}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
}
