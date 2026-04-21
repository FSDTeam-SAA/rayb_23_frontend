"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface BusinessContextProps {
  selectedBusinessId: string | undefined;
  setSelectedBusinessId: (id: string | undefined) => void;
}

const BusinessContext = createContext<BusinessContextProps | undefined>(
  undefined
);

interface BusinessContextProviderProps {
  children: ReactNode;
}

// --------- Provider ---------
export function BusinessContextProvider({
  children,
}: BusinessContextProviderProps): JSX.Element {
  const [selectedBusinessId, setSelectedBusinessId] = useState<
    string | undefined
  >(undefined);

  return (
    <BusinessContext.Provider
      value={{ selectedBusinessId, setSelectedBusinessId }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

// --------- Hook ---------
export const useBusinessContext = (): BusinessContextProps => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error(
      "useBusinessContext must be used within a BusinessContextProvider"
    );
  }
  return context;
};