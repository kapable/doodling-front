import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import UploadEditor from '../components/UploadEditor';
import { LOAD_CATEGORIES_REQUEST } from '../reducers/category';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Upload = () => {
    const { myInfo } = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if(!myInfo) {
            alert('글쓰기는 로그인이 필요합니다');
            router.replace('/');
        }
    }, [myInfo]);
    

    return (
        <Fragment>
            <Head>
                <title>글 업로드 - 두들링</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            {myInfo
            ? (<UploadEditor isNewContents={true} />)
            : (null)}
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
        type: LOAD_CATEGORIES_REQUEST
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Upload;