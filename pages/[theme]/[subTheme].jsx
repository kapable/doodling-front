import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const SubTheme = () => {
    const router = useRouter();
    const { subTheme } = router.query;

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
            {subTheme}
        </Fragment>
    );
};

export default SubTheme;