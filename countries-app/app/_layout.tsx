import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';
import React from 'react';

const Layout: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default Layout;
