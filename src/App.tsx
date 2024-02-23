import React from 'react';

import { Amplify, Hub } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { CONNECTION_STATE_CHANGE, ConnectionState, AWSIoTProvider } from '@aws-amplify/pubsub';
import '@aws-amplify/ui-react/styles.css';
import LatestMessage from './LatestMessage';

Amplify.Logger.LOG_LEVEL = 'VERBOSE;'

Amplify.configure({
  Auth: {
    userPoolWebClientId: 'ji4tv7q81n7rbbmv1bkmkeb8i',
    userPoolId: 'us-west-2_UqKk6Qvs1',
    identityPoolId: 'us-west-2:ba429fe0-7865-4c71-8715-287b89ec7b5f',
  },
});

Hub.listen('pubsub', (data: any) => {
  console.log('data', data);
  const { payload } = data;
  if (payload.event === CONNECTION_STATE_CHANGE) {
    const connectionState = payload.data.connectionState as ConnectionState;
    console.log(connectionState);
  }
});

Amplify.addPluggable(
  new AWSIoTProvider({
    // clientId: 'SAUPTZ1GW-001E5E03552C' + Date.now(),
    aws_pubsub_region: 'us-west-2',
    aws_pubsub_endpoint: 'wss://asyh9zqgbddbc-ats.iot.us-west-2.amazonaws.com/mqtt',
  })
);

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
