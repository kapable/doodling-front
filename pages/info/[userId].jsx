import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BasicInfoCard from '../../components/Info/BasicInfoCard';
import DescriptionCard from '../../components/Info/DescriptionCard';
import MyPosts from '../../components/Info/MyPosts';
import { useSelector } from 'react-redux';

const UserInfo = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { logOutDone } = useSelector((state) => state.user);

    return (
        <Fragment>
            <Head>
                <title>{`${userId} 님의 프로필`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <BasicInfoCard />
            <DescriptionCard />
            <MyPosts />
        </Fragment>
    );
};

export default UserInfo;