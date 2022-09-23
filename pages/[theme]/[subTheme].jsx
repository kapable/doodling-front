import React from 'react';
import { useRouter } from 'next/router';

const SubTheme = () => {
    const router = useRouter();
    const { subTheme } = router.query;

    return (
        <div>{console.log(subTheme)}</div>
    );
};

export default SubTheme;