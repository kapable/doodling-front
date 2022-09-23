import React from 'react';
import { useRouter } from 'next/router';

const Post = () => {
    const router = useRouter();
    const { postId } = router.query;

    return (
        <div>{console.log(postId)}</div>
    );
};

export default Post;