"use client";
import { createContext, useContext, useState } from "react";

const ContextProvider = createContext<any>(null);

export default function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  return (
    <ContextProvider.Provider value={{ user, setUser }}>
      {children}
    </ContextProvider.Provider>
  );
}

export function useMyContext() {
  const context = useContext(ContextProvider);
  if (context === null) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
}
