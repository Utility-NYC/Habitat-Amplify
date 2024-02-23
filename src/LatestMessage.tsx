import React, { useState, useEffect, memo } from 'react';
import { PubSub, Auth } from 'aws-amplify';

function LatestMessage() {
    const [message] = useState<string>('Hello World');

    useEffect(() => {
        Auth.currentCredentials().then((info) => {
            console.log(info);
        });

        PubSub.subscribe('#').subscribe({
            next: (data) => console.log('Message received', data),
            error: (error) => console.error(error),
            complete: () => console.log('Done')
        });
    }, [])

    return <p>{message}</p>
}

export default memo(LatestMessage);