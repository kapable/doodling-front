import React from 'react';
import { useRouter } from 'next/router';

const Top100 = () => {
    const router = useRouter();
    const { period } = router.query;

    return (
        <div>{console.log(period)}</div>
    );
};

export default Top100;