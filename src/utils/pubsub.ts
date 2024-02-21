import { Amplify } from 'aws-amplify';
import { PubSub } from '@aws-amplify/pubsub';

export const pubsub = new PubSub({
    region: 'us-west-2',
    endpoint: 'wss://asyh9zqgbddbc-ats.iot.us-west-2.amazonaws.com/mqtt',
});

// export const pubsub = new PubSub({
//     region: 'us-east-2',
//     endpoint: 'wss://a2y3ze4i03m03k-ats.iot.us-east-2.amazonaws.com/mqtt',
// });