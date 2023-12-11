'use client';

import Layout from '@/src/components/layouts/Layout';
import React from 'react';

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};

export default AuthLayout;
