import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '../../components/NavigationBar';
import TopPostsList from '../../components/Top/TopPostsList';

const Top100 = () => {
    const router = useRouter();
    const { period } = router.query;

    const [topPeriod, setTopPeriod] = useState('');

    // set period of top posts with the query
    useEffect(() => {
        if(period === 'top100Weekly') { // in case of /top100
            setTopPeriod('weekly');
        } else if(period === 'top100Monthly') {
            setTopPeriod('monthly');
        };
    }, [period]);

    // in case of the query is wrong
    useEffect(() => {
        if(period !== 'top100Weekly' && period !== 'top100Monthly' && period !== null && period !== '' && period !== undefined) {
            router.push('/404');
        }
    }, [period]);

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
            <TopPostsList topPeriod={topPeriod} />
        </Fragment>
    );
};

export default Top100;