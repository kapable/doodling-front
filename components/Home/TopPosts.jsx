import { CommentOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

const TopPosts = () => {
    const { realtimeTop10Posts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);

    return (
        <div className='home-realtime-top-posts-div'>
            <div className='title-div'><span className='title-span'>실시간 인기 게시물</span></div>
            <div>
                {realtimeTop10Posts
                .slice().sort((a, b) => (parseFloat(a.realTimeRank) - parseFloat(b.realTimeRank))) // sorting by category ID ASC
                .map((post, index) => (
                    <Link href={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}`} key={`${post.Post.title}-link`}><a>
                        <Row key={`${post.Post.title}-row`} className='each-realtime-post-row'>
                            <Col span={22}>
                                {/* Number */}
                                <span className='each-realtime-post-number'>{index+1}</span> &nbsp;
                                {/* Category */}
                                <span className='each-realtime-post-category'>{post.Post.Category.label}</span> &nbsp;
                                {/* Title */}
                                <span className='each-realtime-post-title'>{post.Post.title.length > 15 ? `${post.Post.title.slice(0, 15)}...` : post.Post.title}</span> &nbsp;
                                {/* MBTI */}
                                <span style={{ backgroundColor : categoriesColorObj[post.Post.User.mbti]}} className='each-realtime-post-mbti'>{post.Post.User.mbti}</span>
                            </Col>
                            <Col span={2}>
                                {/* Comments */}
                                <span className='each-realtime-post-comments'><CommentOutlined />&nbsp;{post.Post.comments}</span>
                            </Col>
                        </Row>
                    </a></Link>
                ))}
            </div>
            {/* Show More to Go to Top100 Main */}
            <Link href={`/top100`}><a>
                <div className='new-posts-more-div'>{"더보기 >"}</div>
            </a></Link>
        </div>
    );
};

export default TopPosts;