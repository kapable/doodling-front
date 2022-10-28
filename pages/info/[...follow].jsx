import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FollowList from '../../components/Info/FollowList';
import { useEffect } from 'react';
import { useState } from 'react';
import wrapper from '../../store/configureStore';
import axios from 'axios';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';

const Follow = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { follow } = router.query;

    const [ userNickname, setUserNickname ] = useState('');
    const [ followType, setFollowType ] = useState('');

    // set user info from the query
    useEffect(() => {
        setUserNickname(follow ? follow[0] : null);
        setFollowType(follow ? follow[1] : null);
    }, [follow]);

    // in case of the query is wrong
    useEffect(() => {
        if(followType !== 'follower' && followType !== 'following' && followType !== null && followType !== '' && followType !== undefined) {
            router.push('/404');
        }
    }, [followType]);

    // get userList depends on follow type(follower || following)
    useEffect(() => {
        if(followType === 'follower') {
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
                data: { userNickname }
            });
        } else if(followType === 'following') {
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
                data: { userNickname }
            });
        }
    }, [followType, userNickname]);

    return (
        <Fragment>
            <Head>
                <title>{`${userNickname} 님의 ${followType}`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            {/* go to profile page */}
            <Row className='profile-follow-back-to-profile-row'>
                <Col span={24}>
                    <Link href={`/info/${userNickname}`}><a><LeftOutlined /> {userNickname} 프로필</a></Link>
                </Col>
            </Row>
            {/* follow list */}
            <FollowList type={followType} userNickname={userNickname} />
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
        data: params.follow[0]
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Follow;