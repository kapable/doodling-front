import React from 'react';
import { useRouter } from 'next/router';

const Follow = () => {
    const router = useRouter();
    const { follow } = router.query;

    return (
        <div>{console.log(follow)}</div>
    );
};

export default Follow;