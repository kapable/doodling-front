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
import { GET_REPORT_LABELS_REQUEST } from '../../reducers/report';

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
        if(singlePost?.enabled === false) {
            alert('더이상 존재하지 않는 게시물입니다.');
            router.push('/');
        }
    }, [singlePost]);

    useEffect(() => {
        if(myInfo?.id) {
            dispatch({
                type: LOAD_USER_INFO_REQUEST,
                data: myInfo.nickname,
            });
        }
    }, [myInfo]);

    return (
        <Fragment>
            <Head>
                <title>{`${singlePost?.title || '두들링'} - 두들링`}</title>
                <link rel='main-url' href={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}/${singlePost?.id || null}`} />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content={`${singlePost?.title || '두들링'} 게시판 - 두들링`} />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}/${singlePost?.id || null}`} />
                <meta property="og:title" content={`${singlePost?.title || '두들링'} - 두들링`}/>
                <meta property="og:description" content={`$${singlePost?.title || '두들링'} 게시판 - 두들링`}/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content={`$${singlePost?.title || '두들링'} 게시판 - 두들링`} />
                <meta property='og:site_name' content={`${singlePost?.title || '두들링'} - 두들링`} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content={`https://doodling.kr/${theme ? theme : null}/${subTheme ? subTheme : null}/${singlePost?.id || null}`}/>
                <meta property="twitter:title" content={`${singlePost?.title || '두들링'} - 두들링`}/>
                <meta property="twitter:description" content={`${singlePost?.title || '두들링'} 게시판 - 두들링`}/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content={`${singlePost?.title || '두들링'} 게시판 - 두들링`} />
                <meta property='og:site_name' content={`${singlePost?.title || '두들링'} - 두들링`} />
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
                    <CommentsList postId={singlePost?.id} comments={singlePost?.Comments} userId={singlePost?.User?.id} postComments={singlePost?.PostComments || 0}/>
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
    store.dispatch({
        type: GET_REPORT_LABELS_REQUEST
    });
    store.dispatch(END);
    
    await store.sagaTask.toPromise();
});

export default Post;