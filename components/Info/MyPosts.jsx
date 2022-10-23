import { Col, Pagination, Row, Tabs } from 'antd';
import Link from 'next/link';
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { LOAD_MY_COMMENT_POSTS_REQUEST, LOAD_MY_LIKE_POSTS_REQUEST, LOAD_MY_WRITE_POSTS_REQUEST } from '../../reducers/posts';
import { CommentOutlined } from '@ant-design/icons';

const MyPosts = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const { myPosts } = useSelector((state) => state.posts);

    const tabItems = [
        { label: '작성한 글', key: 'write' },
        { label: '댓글단 글', key: 'comment' },
        { label: '좋아요한 글', key: 'like' },
    ];
    const [currentMode, setCurrentMode] = useState(tabItems[0].key);
    const onTabClick = useCallback((mode) => {
        setCurrentMode(mode);
    }, []);

    useEffect(() => {
        // const lastId = myPosts[myPosts?.length - 1]?.id || null;
        if(userInfo.nickname && currentMode === 'write') {
            dispatch({
                type: LOAD_MY_WRITE_POSTS_REQUEST,
                data: { userNickname: userInfo.nickname },
            });
        } else if(userInfo.nickname && currentMode === 'comment') {
            dispatch({
                type: LOAD_MY_WRITE_POSTS_REQUEST,
                data: { userNickname:userInfo?.nickname },
            });
        } else if (userInfo.nickname && currentMode === 'like') {
            dispatch({
                type: LOAD_MY_WRITE_POSTS_REQUEST,
                data: { userNickname:userInfo?.nickname },
            });
        }
    }, [currentMode, userInfo.nickname]);

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
            {myPosts && myPosts.length > 1
            ? (
                myPosts.map((post) => (
                    <Link href={`/${post.SubCategory.Category.domain}/${post.SubCategory.domain}/${post.id}`}>
                        <Row className='profile-my-post-main-row' key={`${post.id}-row`}>
                            <Col span={18}>
                                <Row><span>{post.title}</span>&nbsp;<span>{post.User.mbti}</span></Row>
                                <Row><span>
                                    <span>{post.views}</span>&nbsp;|&nbsp;
                                    <span>{post.likes}</span>&nbsp;|&nbsp;
                                    <span>{post.User.nickname}</span>
                                </span></Row>
                            </Col>
                            <Col span={6}>
                                <Row justify={'end'}><span>{dayjs(post.createdAt).diff(dayjs(), 'hours') < -240
                                        ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                        : dayjs(post.createdAt).fromNow()}</span>
                                    <span><CommentOutlined /> {post.comments}</span>
                                </Row>
                            </Col>
                        </Row>
                    </Link>
                ))
            )
            : <div>게시글이 존재하지 않습니다.</div>
            }
            {/* Pagination */}
            <Pagination
                style={{width: "fit-content", margin: "1.5rem auto"}}
                className='post-page-comments-pagination'
                // current={currentPage}
                showSizeChanger={false}
                // total={categoryNew15Posts.length}
                // onChange={onPageChange}
                defaultPageSize={15} />
            {console.log(myPosts)}
        </div>
    );
};

export default MyPosts;