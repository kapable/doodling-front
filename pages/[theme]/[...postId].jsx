import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PostTitleCard from '../../components/Post/PostTitleCard';
import MainContentsCard from '../../components/Post/MainContentsCard';
import CommentsCard from '../../components/Post/CommentsCard';
import RecommendPosts from '../../components/Post/RecommendPosts';
import NavigationBar from '../../components/NavigationBar';
import { LOAD_POST_REQUEST, VIEW_POST_REQUEST } from '../../reducers/post';
import { Divider } from 'antd';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { END } from 'redux-saga';
import CommentsList from '../../components/Post/CommentsList';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const Post = () => {
    const dispatch = useDispatch();
    const { singlePost } = useSelector((state) => state.post);
    const { myInfo } = useSelector((state) => state.user);
    const router = useRouter();
    const { theme, postId } = router.query;
    const [subTheme, setSubTheme] = useState('');

    // check with enabled post
    useEffect(() => {
        setSubTheme(postId ? postId[0] : null);
    }, [postId]);

    useEffect(() => {
        if(!singlePost?.enabled) {
            alert('더이상 존재하지 않는 게시물입니다.');
            router.push('/');
        }
    }, [singlePost]);

    useEffect(() => {
        if(myInfo?.id) {
            dispatch({
                type: LOAD_USER_INFO_REQUEST,
                data: myInfo.id,
            });
        }
    }, [myInfo]);

    return (
        <Fragment>
            <Head>
                <title>{`${singlePost?.title || '두들링'} - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={theme} subCategoryDomain={subTheme} />
            {/* category & back url */}
            {singlePost?.enabled // rendering check with enabled post
            ? (
                <div className='post-contents-main-div'>
                    <PostTitleCard contents={singlePost}/>
                    <Divider />
                    <MainContentsCard contents={singlePost} categoryDomain={theme} subCategoryDomain={subTheme} />
                    <Divider />
                    <CommentsCard contents={singlePost}/>
                    <CommentsList postId={singlePost?.id} comments={singlePost?.Comments} userId={singlePost?.User?.id} />
                    <Divider />
                    {/* <RecommendPosts /> */}
                </div>
            )
            : (null)
            }
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
        data: params.postId[1]
    });
    store.dispatch({
        type: VIEW_POST_REQUEST, // 포스트 보기
        data: { postId: params.postId[1] }
    });
    store.dispatch(END);
    
    await store.sagaTask.toPromise();
});

export default Post;