import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import PostTitleCard from '../../components/Post/PostTitleCard';
import MainContentsCard from '../../components/Post/MainContentsCard';
import CommentsCard from '../../components/Post/CommentsCard';
import RecommendPosts from '../../components/Post/RecommendPosts';
import NavigationBar from '../../components/NavigationBar';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { Divider } from 'antd';

const Post = () => {
    const dispatch = useDispatch();
    const { singlePost } = useSelector((state) => state.post);
    const router = useRouter();
    const { theme, postId } = router.query;
    const [subTheme, setSubTheme] = useState('');
    const [postNum, setPostNum] = useState('');

    
    useEffect(() => {
        setSubTheme(postId ? postId[0] : null);
        setPostNum(postId ? postId[1] : null);
    }, [postId]);
    
    useEffect(() => {
        if(postNum) {
            dispatch({
                type: LOAD_POST_REQUEST,
                data: postNum
            });
        }
    }, [postNum]);

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
            <div className='post-contents-main-div'>
                <PostTitleCard contents={singlePost}/>
                <Divider />
                <MainContentsCard contents={singlePost?.text} />
                <Divider />
                <CommentsCard comments={singlePost?.Comments}/>
                <Divider />
                <RecommendPosts />
            </div>
        </Fragment>
    );
};

export default Post;