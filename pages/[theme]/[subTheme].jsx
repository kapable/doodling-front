import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '../../components/NavigationBar';
import TItleInfoCard from '../../components/Theme/TItleInfoCard';
import TopFivePosts from '../../components/Theme/TopFivePosts';
import NewPosts from '../../components/Theme/NewPosts';

const SubTheme = () => {
    const router = useRouter();
    const { theme, subTheme } = router.query;

    return (
        <Fragment>
            <Head>
                <title>{`${subTheme ? subTheme : null} 게시판 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={theme} subCategoryDomain={subTheme} />
            <TItleInfoCard />
            <TopFivePosts />
            <NewPosts />
        </Fragment>
    );
};

export default SubTheme;