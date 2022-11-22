import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import RegisterForm from '../components/RegisterForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Register = () => {

    const { myInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if(myInfo) {
            Router.replace('/');
        };
    }, [myInfo]);

    return (
        <Fragment>
            <Head>
                <title>회원가입 - 두들링</title>
                <link rel='main-url' href='https://doodling.kr/register' />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://doodling.kr/register' />
                <meta property="og:title" content='회원가입 | 두들링'/>
                <meta property="og:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='회원가입 | 두들링' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://doodling.kr/register'/>
                <meta property="twitter:title" content='회원가입 | 두들링'/>
                <meta property="twitter:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='회원가입 | 두들링' />
            </Head>
            {myInfo ? null : (<RegisterForm />)}
        </Fragment>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Register;