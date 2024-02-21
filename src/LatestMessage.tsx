import React, { useState, useEffect, memo } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { pubsub } from './utils/pubsub';

function LatestMessage() {
    const [message, setMessage] = useState<string>('Hello World');
    useEffect(() => {
        console.log('Subscribing...');

        fetchAuthSession().then((info) => {
            console.log(info);
        });

        pubsub.subscribe({ topics: ['messages'] }).subscribe({
            next: (data: any) => {
                console.log(data);
            },
            error: (error) => console.error(error),
            complete: () => console.log('Done')
        });
    }, [])

    return <p>{message}</p>
}

export default memo(LatestMessage);