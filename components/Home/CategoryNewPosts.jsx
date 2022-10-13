import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';

const CategoryNewPosts = () => {
    const { categoryNewPosts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);

    return (
        <div className='home-category-new-posts-main-div'>
            {categoryNewPosts.slice().sort((a, b) => (parseFloat(a.id) - parseFloat(b.id))) // sorting by category ID ASC
            .map((cat) => (
                <div className='new-posts-category-div' key={`${cat.label}-div`}>
                    {/* Main Category Title */}
                    <h1 key={`${cat.label}-title`}>{cat.label}</h1>
                    {cat.posts.length > 0 // if posts exists
                    ? (cat.posts.map((post, index) => (
                        // A post renderer start
                        <Link href={`/${cat.domain}/${post['SubCategory.domain']}/${post.id}`} key={`/${cat.domain}/${post['SubCategory.domain']}/${post.id}`}><a>
                            <Row className='new-posts-post-row' key={`${cat.label}-contents-${index}`}>
                                {/* Title and MBTI */}
                                <Col span={18}>
                                    {console.log('DEBUG', post)}
                                    <span className='new-posts-title-span'>{post.title.length > 15 ? `${post.title.slice(0, 15)}...` : post.title}</span>
                                    &nbsp;<span className='new-posts-nickname-span'>{post['User.nickname']}</span>
                                    &nbsp;<span className='new-posts-mbti-span' style={{ backgroundColor : categoriesColorObj[post['User.mbti']]}}>
                                        {post['User.mbti']}</span>
                                </Col>
                                {/* Date */}
                                <Col className='new-posts-date-col' span={6}>{dayjs(post.createdAt).diff(dayjs(), 'hours') < -24
                                    ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                    : dayjs(post.createdAt).fromNow()}</Col>
                            </Row>
                        </a></Link>
                    )))
                    // if posts don't exists
                    : (<p className='no-posts-row'>신규 포스트가 없습니다.</p>)
                    }
                    {/* Show More to Go to Category Main */}
                    <Link href={`/${cat.domain}`}><a>
                        <div className='new-posts-more-div'>{"더보기 >"}</div>
                    </a></Link>
                </div>
            ))}
        </div>
    );
};

export default CategoryNewPosts;