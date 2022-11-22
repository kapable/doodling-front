import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import BasicInfoCard from '../../components/Info/BasicInfoCard';
import DescriptionCard from '../../components/Info/DescriptionCard';
import MyPosts from '../../components/Info/MyPosts';
import { useSelector } from 'react-redux';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import { Divider } from 'antd';
import { LOAD_MY_WRITE_POSTS_REQUEST } from '../../reducers/posts';
import Router from 'next/router';

const UserInfo = () => {
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if(userInfo?.enabled == false) {
            alert('더이상 존재하지 않는 유저입니다.');
            Router.replace('/');
        };
    }, [userInfo]);

    return (
        <Fragment>
            <Head>
                <title>{`${userInfo.nickname} 님의 프로필`}</title>
                <link rel='main-url' href={`https://doodling.kr/info/${userInfo.nickname}`} />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://doodling.kr/info/${userInfo.nickname}`} />
                <meta property="og:title" content={`${userInfo.nickname} 님의 프로필`}/>
                <meta property="og:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content={`${userInfo.nickname} 님의 프로필`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://doodling.kr/info/${userInfo.nickname}`}/>
                <meta property="twitter:title" content={`${userInfo.nickname} 님의 프로필`}/>
                <meta property="twitter:description" content="두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content={`${userInfo.nickname} 님의 프로필`} />
            </Head>
            <BasicInfoCard />
            <Divider />
            <DescriptionCard />
            <Divider />
            <MyPosts />
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
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: params.userNickname
    });
    store.dispatch({
        type: LOAD_MY_WRITE_POSTS_REQUEST,
        data: { userNickname: params.userNickname }
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default UserInfo;