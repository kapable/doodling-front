import { Col, Pagination, Row, Tabs } from 'antd';
import Link from 'next/link';
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { INITIALIZE_MY_POSTS, LOAD_MY_COMMENT_POSTS_REQUEST, LOAD_MY_LIKE_POSTS_REQUEST, LOAD_MY_WRITE_POSTS_REQUEST } from '../../reducers/posts';
import { CommentOutlined, LikeFilled } from '@ant-design/icons';
import * as gtag from '../../lib/gtag';

const MyPosts = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { myPosts, hasMorePosts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [postsLength, setPostsLength] = useState(userInfo?.posts);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = useCallback((e) => {
        gtag.event({ action: "Click MyArticle Pagination", category: "Paging", label: "profile page" });
        setCurrentPage(e);
    }, []);

    const tabItems = [
        { label: '작성한 글', key: 'write' },
        { label: '댓글단 글', key: 'comment' },
        { label: '좋아요한 글', key: 'like' },
    ];
    const [currentMode, setCurrentMode] = useState(tabItems[0].key);
    const onTabClick = useCallback((mode) => {
        gtag.event({ action: "Tab MyArticles NavBar", category: "Navigating", label: "profile page" });
        setCurrentMode(mode);
    }, []);

    useEffect(() => {
        // const lastId = myPosts[myPosts?.length - 1]?.id || null;
        if(userInfo.nickname && currentMode === 'write') {
            setPostsLength(userInfo?.posts);
            dispatch({
                type: INITIALIZE_MY_POSTS
            });
            dispatch({
                type: LOAD_MY_WRITE_POSTS_REQUEST,
                data: { userNickname: userInfo.nickname },
            });
        } else if(userInfo.nickname && currentMode === 'comment') {
            setPostsLength(userInfo?.comments);
            dispatch({
            type: INITIALIZE_MY_POSTS
        });
            dispatch({
                type: LOAD_MY_COMMENT_POSTS_REQUEST,
                data: { userId:userInfo?.id },
            });
        } else if (userInfo.nickname && currentMode === 'like') {
            setPostsLength(userInfo?.postLikes);
            dispatch({
            type: INITIALIZE_MY_POSTS
        });
            dispatch({
                type: LOAD_MY_LIKE_POSTS_REQUEST,
                data: { userId: userInfo.id },
            });
        }
    }, [currentMode, userInfo]);

    useEffect(() => { // for loading more posts with pagenation
        if(currentPage % 3 === 0 && hasMorePosts) {
            const lastId = myPosts[myPosts.length - 1]?.id;
            if(userInfo.nickname && currentMode === 'write') {
                dispatch({
                    type: LOAD_MY_WRITE_POSTS_REQUEST,
                    data: { userNickname: userInfo.nickname, lastId },
                });
            } else if(userInfo.nickname && currentMode === 'comment') {
                dispatch({
                    type: LOAD_MY_COMMENT_POSTS_REQUEST,
                    data: { userId: userInfo.id, lastId },
                });
            } else if (userInfo.nickname && currentMode === 'like') {
                dispatch({
                    type: LOAD_MY_LIKE_POSTS_REQUEST,
                    data: { userId: userInfo.id, lastId },
                });
            }
        };
    }, [currentPage, hasMorePosts, userInfo]);

    return (
        <div className='profile-my-post-main-div'>
            {/* Tab Bar */}
            <Tabs
                items={tabItems}
                activeKey={currentMode}
                onTabClick={onTabClick}
                tabPosition='top' size='default' type='line'
                tabBarGutter={20}
                tabBarStyle={{backgroundColor: 'white', height:'2.7rem'}}
                animated={false}
            />
            {/* Posts Rendering */}
            {myPosts && myPosts.length > 0
            ? (
                myPosts
                .slice((currentPage-1)*5, (currentPage-1)*5+5)
                .map((post) => (
                    <Link key={`${post.id}-link`} href={`/${post.SubCategory.Category.domain}/${post.SubCategory.domain}/${post.id}`}>
                        <a onClick={() => {gtag.event({ action: "Go to Article", category: "Paging", label: "profile page" })}}>
                            <Row className='profile-my-post-main-row' key={`${post.id}-row`}>
                                <Col span={18}>
                                    <Row><span>{post.title}</span>&nbsp;<span className='my-post-mbti-span' style={{ backgroundColor : categoriesColorObj[post.User?.mbti]}}>{post.User.mbti}</span></Row>
                                    <Row className='my-post-info-row'><span>
                                        <span>조회수 {post.views}</span>&nbsp;|&nbsp;
                                        <span><LikeFilled /> {post.likes}</span>&nbsp;|&nbsp;
                                        <span>{post.User.nickname}</span>
                                    </span></Row>
                                </Col>
                                <Col span={6}>
                                    <Row justify={'end'} className='my-post-right-info-row'><span>{dayjs(post.createdAt).diff(dayjs(), 'days') < -240
                                            ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                            : dayjs(post.createdAt).fromNow()}</span>&nbsp;
                                        <span><CommentOutlined /> {post.comments}</span>
                                    </Row>
                                </Col>
                            </Row>
                        </a></Link>
                ))
            )
            : <div className='profile-my-post-no-data-div'>아직 게시글이 존재하지 않습니다.</div>
            }
            {/* Pagination */}
            {myPosts && myPosts.length > 0
            ? (
                <Pagination
                    style={{width: "fit-content", margin: "1.5rem auto"}}
                    className='post-page-comments-pagination'
                    current={currentPage}
                    showSizeChanger={false}
                    total={postsLength}
                    onChange={onPageChange}
                    defaultPageSize={5} />
            )
            : null}
        </div>
    );
};

export default MyPosts;