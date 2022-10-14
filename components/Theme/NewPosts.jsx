import { Col, Pagination, Row } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { LikeFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const NewPosts = () => {
    const { categoryNew15Posts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);

    return (
        <div className='category-new-15-posts-div'>
            {categoryNew15Posts.map((post) => (
                // Category & SubCategory Needed
                <Link href={`/${post?.SubCategory.Category.domain}/${post?.SubCategory.domain}/${post.id}`} key={`${post.id}-newPost-link`}><a> 
                    <Row className='new-15-each-post-row' key={`${post.id}-newPost`}>
                        <Col span={18}>
                            <Row className='new-15-each-post-title-row'>
                                <span>{post?.title.length > 15 ? `${post.title.slice(15)}...` : post.title}</span> &nbsp;
                                <span className='new-15-each-post-title-row-mbti' style={{ backgroundColor : categoriesColorObj[post.User.mbti]}}>
                                    {post.User.mbti}
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
            {/* <Pagination /> */}
        </div>
    );
};

export default NewPosts;