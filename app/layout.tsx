'use client';

import React, { useMemo } from 'react';
import '@/src/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'jotai';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
