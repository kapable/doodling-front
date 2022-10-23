import React, { Fragment } from 'react';
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

const UserInfo = () => {
    const { userInfo, logOutDone } = useSelector((state) => state.user);

    return (
        <Fragment>
            <Head>
                <title>{`${userInfo.nickname} 님의 프로필`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
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