import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import NavigationBar from '../../components/NavigationBar';

const Theme = () => {
    const router = useRouter();
    const { theme } = router.query;

    return (
        <Fragment>
            <Head>
                <title>{`${theme ? theme : null} 게시판 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={theme} />
            Theme Main
        </Fragment>
    );
};

export default Theme;