import React, { Fragment } from 'react';
import Head from 'next/head';
import HomeLayout from '../components/HomeLayout';
import NavigationBar from '../components/NavigationBar';

const Home = () => {

    return (
        <Fragment>
            <Head>
                <title>두들링 - Doodling</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <link rel="mask-icon" href="/doodling-favicon.png" />
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain='main' />
            <HomeLayout />
        </Fragment>
    );
};

export default Home;