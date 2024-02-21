import React from 'react';

import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { Hub } from 'aws-amplify/utils';
import '@aws-amplify/ui-react/styles.css';
import LatestMessage from './LatestMessage';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: 'ji4tv7q81n7rbbmv1bkmkeb8i',
      userPoolId: 'us-west-2_UqKk6Qvs1',
      identityPoolId: 'us-west-2:ba429fe0-7865-4c71-8715-287b89ec7b5f',
    },
  },
});

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       userPoolClientId: '60k24k7s5fkbcvnuefpm65lvq6',
//       userPoolId: 'us-east-2_z2uNTF4Le',
//       identityPoolId: 'us-east-2:710dfa3b-a9c3-489f-b927-8564ee85ab2f',
//     },
//   },
// });

Hub.listen('pubsub', (data: any) => {
  console.log('data', data);
  const { payload } = data;
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState as ConnectionState;
    console.log(connectionState);
  }
});

export function App({ signOut, user }: WithAuthenticatorProps) {
  return (
    <>
      <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>

      <LatestMessage />
    </>
  );
}

export default withAuthenticator(App);
