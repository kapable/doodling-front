import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PostTitleCard from '../../components/Post/PostTitleCard';
import MainContentsCard from '../../components/Post/MainContentsCard';
import CommentsCard from '../../components/Post/CommentsCard';
import RecommendPosts from '../../components/Post/RecommendPosts';
import NavigationBar from '../../components/NavigationBar';

const Post = () => {
    const router = useRouter();
    const { theme, postId } = router.query;
    const [subTheme, setSubTheme] = useState('');
    const [postNum, setPostNum] = useState('');


    useEffect(() => {
        setSubTheme(postId ? postId[0] : null);
        setPostNum(postId ? postId[1] : null);
    }, [postId]);

    return (
        <Fragment>
            <Head>
                <title>{`${postNum} - 두들링`}</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <NavigationBar categoryDomain={theme} subCategoryDomain={subTheme} />
            {/* category & back url */}
            <PostTitleCard />
            <MainContentsCard />
            <CommentsCard />
            <RecommendPosts />
        </Fragment>
    );
};

export default Post;