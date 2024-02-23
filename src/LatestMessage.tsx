import React, { useState, useEffect, memo } from 'react';
import { PubSub } from 'aws-amplify';

function LatestMessage() {
    const [message] = useState<string>('Hello World');

    useEffect(() => {
        PubSub.subscribe('myTopic').subscribe({
            next: (data) => console.log('Message received', data),
            error: (error) => console.error(error),
            complete: () => console.log('Done')
        });
    }, [])

    return <p>{message}</p>
}

export default memo(LatestMessage);