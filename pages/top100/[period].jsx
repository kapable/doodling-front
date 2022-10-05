import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '../../components/NavigationBar';
import TopPostsList from '../../components/Top/TopPostsList';

const Top100 = () => {
    const router = useRouter();
    const { period } = router.query;

    return (
        <Fragment>
            <Head>
                <title>{`${period ? period : null} Top100 - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain='top100' subCategoryDomain={period} />
            <TopPostsList />
        </Fragment>
    );
};

export default Top100;