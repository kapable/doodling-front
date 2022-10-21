import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Pagination, Row } from 'antd';
import dayjs from 'dayjs';
import { CommentOutlined, LikeFilled } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';

const TopPostsList = ({ topPeriod }) => {
    const { topPosts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [posts, setPosts] = useState(topPosts);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e);
    }, []);

    useEffect(() => {
        let periodRank = 'realTimeRank';
        if(topPeriod === 'weekly') {
            periodRank = 'weeklyRank';
        } else if(topPeriod === 'monthly') {
            periodRank = 'monthlyRank';
        }
        setPosts(topPosts.slice()
            .sort((a, b) => (parseFloat(a[periodRank]) - parseFloat(b[periodRank])))
        ); // sorting by periodRank
    }, [topPeriod, topPosts]);

    const RankImageRenderer = useCallback((index) => {
        return <Image src={`https://images.doodling.kr/basic/top100-${index+1}.png`} alt={`rank-${index+1}`} width={50} height={50} />
    }, []);

    return (
        <div className='top100-posts-main-div'>
            <div className='top3-main-div'>
                {posts && posts.slice(0, 3) // for top 3
                .map((post, index) => (
                    <Link
                        href={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}`}
                        key={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}-link`}><a>
                        <Row className='top3-main-row'>
                            <Col xs={{ span: 16 }} lg={{ span: 20 }}>
                                <Row>
                                    <Col xs={{ span: 5 }} lg={{ span: 2 }}>
                                        {RankImageRenderer(index)}
                                        {/* <img src={`https://images.doodling.kr/basic/top100-${index+1}.png`} alt={`rank-${index+1}`} width='50' /> */}
                                    </Col>
                                    <Col xs={{ span: 19 }} lg={{ span: 22 }}>
                                        <Row>
                                            <span className='top3-title-span'>{post.Post?.title?.length > 10 ? `${post.Post.title.slice(0, 10)}...` : post.Post.title}</span> &nbsp;
                                            <span className='top3-mbti-span' style={{ backgroundColor : categoriesColorObj[post.Post.User.mbti]}}>{post.Post.User.mbti}</span>
                                        </Row>
                                        <Row className='top3-info-row'>
                                            <span className='top3-views-span'>조회수 {post.Post.views}</span>&nbsp;|&nbsp;
                                            <span className='top3-likes-span'><LikeFilled /> {post.Post.likes}</span>&nbsp;|&nbsp;
                                            <span className='top3-nickname-span'>{post.Post.User.nickname}</span>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                                <Row className='top3-right-row' justify={'end'}>
                                    {/* DateTime */}
                                    {dayjs(post.Post.createdAt).diff(dayjs(), 'hours') < -240
                                        ? dayjs(post.Post.createdAt).format('YYYY-MM-DD')
                                        : dayjs(post.Post.createdAt).fromNow()} &nbsp;
                                    {/* Comments */}
                                    <span className='top5-comments-span'><CommentOutlined />&nbsp;{post.Post.comments}</span>
                                </Row>
                            </Col>
                        </Row>
                    </a></Link>
                ))}
            </div>
            <div className='top-rest-main-div'>
                {posts && posts.slice(3, 15)
                .map((post, index) => (
                    <Link
                        href={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}`}
                        key={`/${post.Post.Category.domain}/${post.Post.SubCategory.domain}/${post.PostId}-link`}><a>
                        <Row className='rest-main-row'>
                            <Col xs={{ span: 16 }} lg={{ span: 20 }}>
                                <Row>
                                    <Col className='rest-index-col' xs={{ span: 5 }} lg={{ span: 2 }}>
                                        <span className='rest-index-span'>{index+3}</span>
                                    </Col>
                                    <Col xs={{ span: 19 }} lg={{ span: 22 }}>
                                        <Row>
                                            <span className='rest-title-span'>{post.Post.title}</span> &nbsp;
                                            <span className='rest-mbti-span' style={{ backgroundColor : categoriesColorObj[post.Post.User.mbti]}}>{post.Post.User.mbti}</span>
                                        </Row>
                                        <Row className='rest-info-row'>
                                            <span className='rest-views-span'>조회수 {post.Post.views}</span>&nbsp;|&nbsp;
                                            <span className='rest-likes-span'><LikeFilled /> {post.Post.likes}</span>&nbsp;|&nbsp;
                                            <span className='rest-nickname-span'>{post.Post.User.nickname}</span>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={{ span: 8 }} lg={{ span: 4 }}>
                                <Row className='top3-right-row' justify={'end'}>
                                    {/* DateTime */}
                                    {dayjs(post.Post.createdAt).diff(dayjs(), 'hours') < -240
                                        ? dayjs(post.Post.createdAt).format('YYYY-MM-DD')
                                        : dayjs(post.Post.createdAt).fromNow()} &nbsp;
                                    {/* Comments */}
                                    <span className='top5-comments-span'><CommentOutlined />&nbsp;{post.Post.comments}</span>
                                </Row>
                            </Col>
                        </Row>
                    </a></Link>
                ))}
            </div>
            <Pagination
                style={{width: "fit-content", margin: "1.5rem auto"}}
                className='post-page-comments-pagination'
                current={currentPage}
                showSizeChanger={false}
                total={posts.length}
                onChange={onPageChange}
                defaultPageSize={15} />
        </div>
    );
};

TopPostsList.propTypes = {
    topPeriod: PropTypes.string.isRequired,
};

export default TopPostsList;