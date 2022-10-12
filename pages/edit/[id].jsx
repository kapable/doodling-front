import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import UploadEditor from '../../components/UploadEditor';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

const Edit = () => {
    const router = useRouter();
    const { singlePost, editPostDone, editPostError } = useSelector((state) => state.post);

    useEffect(() => {
        if(editPostError) {
            alert('수정 중 오류가 발생했습니다 ㅠㅠ');
        };
        if(editPostDone) {
            alert('수정이 정상적으로 반영되었습니다!');
            router.push(`/${singlePost.SubCategory.Category.id}/${singlePost.SubCategoryId}/${singlePost.id}`)
        };
    }, [editPostDone, singlePost, editPostError]);

    return (
        <Fragment>
            <Head>
                <title>글 수정 - 두들링</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <UploadEditor contents={singlePost} isNewContents={false} />
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
        type: LOAD_CATEGORIES_REQUEST // 카테고리 가져오기
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST // 로그인 했다면 유저 정보 가져오기
    });
    store.dispatch({
        type: LOAD_POST_REQUEST, // 포스트 가져오기
        data: params.id
    });
    store.dispatch(END);
    
    await store.sagaTask.toPromise();
});

export default Edit;