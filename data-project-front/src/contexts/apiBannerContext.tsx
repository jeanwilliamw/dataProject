import { ReactNode, createContext, useContext, useState } from 'react';

interface ApiBanner {
  message: string;
  type: 'success' | 'failure';
}

interface ApiBannerContextType {
  apiBanner: ApiBanner | null;
  setApiBanner: (message: ApiBanner | null) => void;
}

const ApiBannerContext = createContext<ApiBannerContextType | undefined>(
  undefined,
);

export const useApiBanner = () => {
  const context = useContext(ApiBannerContext);
  if (!context) {
    throw new Error('useApiStatus must be used within a ApiStatusProvider');
  }
  return context;
};

export const ApiBannerProvider = ({ children }: { children: ReactNode }) => {
  const [apiBanner, setApiBanner] = useState<ApiBanner | null>(null);

  return (
    <ApiBannerContext.Provider value={{ apiBanner, setApiBanner }}>
      {children}
    </ApiBannerContext.Provider>
  );
};
