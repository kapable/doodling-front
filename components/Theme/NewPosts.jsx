import { Col, Pagination, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { LikeFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { LOAD_CATEGORIES_NEW_15_POSTS_REQUEST } from '../../reducers/posts';

const NewPosts = ({ categoryDomain }) => {
    const dispatch = useDispatch();
    const { categoryNew15Posts, hasMorePosts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e);
    }, []);

    useEffect(() => {
        if(currentPage % 5 === 0 && hasMorePosts) {
            const lastId = categoryNew15Posts[categoryNew15Posts.length - 1]?.id;
            dispatch({
                type: LOAD_CATEGORIES_NEW_15_POSTS_REQUEST,
                data: { theme: categoryDomain, lastId },
            });
        };
    }, [currentPage, hasMorePosts, categoryDomain]);

    return (
        <div className='category-new-15-posts-div'>
            {categoryNew15Posts
            .slice((currentPage-1)*15, (currentPage-1)*15+15)
            .map((post) => (
                // Category & SubCategory Needed
                <Link href={`/${post?.SubCategory?.Category?.domain}/${post?.SubCategory?.domain}/${post?.id}`} key={`${post?.id}-newPost-link`}><a> 
                    <Row className='new-15-each-post-row' key={`${post.id}-newPost`}>
                        <Col span={18}>
                            <Row className='new-15-each-post-title-row'>
                                <span>{post?.title?.length > 15 ? `${post.title.slice(15)}...` : post.title}</span> &nbsp;
                                <span className='new-15-each-post-title-row-mbti' style={{ backgroundColor : categoriesColorObj[post.User?.mbti]}}>
                                    {post.User?.mbti}
                                </span>
                            </Row>
                            <Row className='new-15-each-post-info-row'>
                                <span>조회수 {post.views}</span>&nbsp;|&nbsp;
                                <span><LikeFilled /> {post.likes}</span>&nbsp;|&nbsp;
                                <span>{post?.User?.nickname}</span>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Row justify={'end'}>{dayjs(post.createdAt).diff(dayjs(), 'hours') < -240
                                        ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                        : dayjs(post.createdAt).fromNow()}
                            </Row>
                        </Col>
                    </Row>
                </a></Link>
            ))}
            <Pagination
                style={{width: "fit-content", margin: "1.5rem auto"}}
                className='post-page-comments-pagination'
                current={currentPage}
                showSizeChanger={false}
                total={categoryNew15Posts.length}
                onChange={onPageChange}
                defaultPageSize={15} />
        </div>
    );
};

NewPosts.propTypes = {
    categoryDomain: PropTypes.string.isRequired,
};

export default NewPosts;