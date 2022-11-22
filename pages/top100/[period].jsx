import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '../../components/NavigationBar';
import TopPostsList from '../../components/Top/TopPostsList';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { END } from 'redux-saga';
import { LOAD_TOP_100_REQUEST } from '../../reducers/posts';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

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
                <link rel='main-url' href={`https://doodling.kr/top100/${period ? period : null}`} />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content={`${period ? period : null} Top100 - 두들링`} />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://doodling.kr/top100/${period ? period : null}`} />
                <meta property="og:title" content={`${period ? period : null} Top100 - 두들링`}/>
                <meta property="og:description" content={`${period ? period : null} Top100 - 두들링`}/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content={`${period ? period : null} Top100 - 두들링`} />
                <meta property='og:site_name' content={`${period ? period : null} Top100 - 두들링`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://doodling.kr/top100/${period ? period : null}`}/>
                <meta property="twitter:title" content={`${period ? period : null} Top100 - 두들링`}/>
                <meta property="twitter:description" content={`${period ? period : null} Top100 - 두들링`}/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content={`${period ? period : null} Top100 - 두들링`} />
                <meta property='og:site_name' content={`${period ? period : null} Top100 - 두들링`} />
            </Head>
            <NavigationBar categoryDomain='top100' subCategoryDomain={period} />
            <TopPostsList topPeriod={topPeriod} />
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_CATEGORIES_REQUEST
    });
    let period = 'weekly';
    if(params.period === 'top100Monthly') { // in case of /top100
        period = 'monthly'
    };
    store.dispatch({
        type: LOAD_TOP_100_REQUEST,
        data: period,
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST // 로그인 했다면 유저 정보 가져오기
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Top100;