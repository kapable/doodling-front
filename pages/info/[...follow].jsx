import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FollowList from '../../components/Info/FollowList';
import { useEffect } from 'react';
import { useState } from 'react';

const Follow = () => {
    const router = useRouter();
    const { follow } = router.query;

    const [userId, setUserId] = useState();

    useEffect(() => {
        setUserId(follow ? follow[0] : null);
    }, [follow]);

    return (
        <Fragment>
            <Head>
                <title>{`${follow ? follow[0] : null} 님의 ${follow ? follow[1] : null}`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <FollowList user={userId} />
        </Fragment>
    );
};

export default Follow;