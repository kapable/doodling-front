import axios from 'axios';
import Head from 'next/head';
import Router from 'next/router';
import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import LoginForm from '../components/LoginForm';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Login = () => {
    const { myInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if(myInfo) {
            alert('로그인하지 않은 유저만 로그인이 가능합니다.');
            Router.replace('/');
        };
    }, [myInfo]);

    return (
        <Fragment>
            <Head>
                <title>로그인 - 두들링</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <LoginForm />
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

export default Login;