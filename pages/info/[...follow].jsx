import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FollowList from '../../components/Info/FollowList';
import { useEffect } from 'react';
import { useState } from 'react';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';

const Follow = () => {
    const router = useRouter();
    const { follow } = router.query;

    const [ userId, setUserId ] = useState('');
    const [ followType, setFollowType ] = useState('');

    // set user info from the query
    useEffect(() => {
        setUserId(follow ? follow[0] : null);
        setFollowType(follow ? follow[1] : null);
    }, [follow]);

    // in case of the query is wrong
    useEffect(() => {
        if(followType !== 'follower' && followType !== 'following' && followType !== null && followType !== '' && followType !== undefined) {
            router.push('/404');
        }
    }, [followType]);

    const followList = [
        {
            "id": 2,
            "nickname": "good boy",
            "mbti": "ENPJ",
            "Follow": {
                "createdAt": "2022-09-26T20:02:50.000Z",
                "updatedAt": "2022-09-26T20:02:50.000Z",
                "FollowingId": 1,
                "FollowerId": 2
            }
        },
        {
            "id": 3,
            "nickname": "bad boy",
            "mbti": "ENTP",
            "Follow": {
                "createdAt": "2022-09-26T20:02:50.000Z",
                "updatedAt": "2022-09-26T20:02:50.000Z",
                "FollowingId": 1,
                "FollowerId": 2
            }
        }
    ];

    return (
        <Fragment>
            <Head>
                <title>{`${userId} 님의 ${followType}`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <FollowList userList={followList} type={followType} />
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
        data: params.follow[0] // conver to userNickename
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Follow;