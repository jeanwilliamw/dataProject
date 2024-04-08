import { ReactNode } from 'react';
import { UserProvider } from './userContext';
import { ApiBannerProvider } from './apiBannerContext';

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <ApiBannerProvider>{children}</ApiBannerProvider>
    </UserProvider>
  );
};
