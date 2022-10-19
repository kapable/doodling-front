import { Col, Row } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { CommentOutlined, LikeFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

const TopFivePosts = ({ isSubCategory }) => {
    const { categoryRealtimeTop5Posts, subCategoryRealtimeTop5Posts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [posts, setPosts] = useState(isSubCategory ? subCategoryRealtimeTop5Posts : categoryRealtimeTop5Posts);

    return (
        <div className='category-realtime-top5-posts-div'>
            {posts && posts
            .slice().sort((a, b) => (parseFloat(a.realTimeRank) - parseFloat(b.realTimeRank))) // sorting by category ID ASC
            .map((post) => (
                <Link href={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}`} key={`${post.Post.title}-link`}><a>
                    <Row className='top5-posts-row'>
                        <Col span={14}>
                            <Row>
                                {/* Title */}
                                <span className='top5-posts-title'>{post.Post?.title?.length > 15 ? `${post.Post.title.slice(15)}...` : post.Post.title}</span>&nbsp;
                                {/* MBTI */}
                                <span className='top5-posts-mbti' style={{ backgroundColor : categoriesColorObj[post.Post.User.mbti]}}>{post.Post.User.mbti}</span>
                            </Row>
                            <Row className='top5-posts-info-row'>
                                {/* Views */}
                                <span>조회수 {post.Post.views}</span>&nbsp;|&nbsp;
                                {/* Likes */}
                                <span><LikeFilled /> {post.Post.likes}</span>&nbsp;|&nbsp;
                                {/* Author */}
                                <span>{post.Post.User.nickname}</span>
                            </Row>
                        </Col>
                        <Col span={10}>
                            <Row justify={'end'}>
                                {/* DateTime */}
                                {dayjs(post.Post.createdAt).diff(dayjs(), 'hours') < -240
                                    ? dayjs(post.Post.createdAt).format('YYYY-MM-DD')
                                    : dayjs(post.Post.createdAt).fromNow()} &nbsp;
                                {/* Comments */}
                                <span className='top5-posts-comments'><CommentOutlined />&nbsp;{post.Post.comments}</span>
                            </Row>
                        </Col>
                    </Row>
                </a></Link>
            ))}
        </div>
    );
};

TopFivePosts.propTypes = {
    isSubCategory: PropTypes.bool,
};

export default TopFivePosts;