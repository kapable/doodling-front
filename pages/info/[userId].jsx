import React from 'react';
import { useRouter } from 'next/router';

const UserInfo = () => {
    const router = useRouter();
    const { userId } = router.query;

    return (
        <div>{ userId }</div>
    );
};

export default UserInfo;