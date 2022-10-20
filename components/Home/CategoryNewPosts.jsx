import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';

const CategoryNewPosts = ({ category }) => {
    const { categoryNewPosts, eachSubCategoryNewPosts } = useSelector((state) => state.posts);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [posts, setPosts] = useState(category ? eachSubCategoryNewPosts : categoryNewPosts); // main home vs notice page

    return (
        <div className='home-category-new-posts-main-div'>
            {posts
            .slice().sort((a, b) => (parseFloat(a.id) - parseFloat(b.id))) // sorting by category ID ASC
            .map((cat) => (
                <div className='new-posts-category-div' key={`${cat?.domain}-new-posts-main-div`}>
                    {/* Main Category Title */}
                    <h1 key={`${cat.label}-title`}>{cat.label}</h1>
                    {cat.posts && cat?.posts.length > 0 // if posts exists
                    ? (cat.posts.map((post, index) => (
                        // A post renderer start
                        <Link href={category
                                ? `/${post['Category.domain']}/${post['SubCategory.domain']}/${post.id}`
                                : `/${cat.domain}/${post['SubCategory.domain']}/${post.id}`}
                            key={category
                                ? `/${post['Category.domain']}/${post['SubCategory.domain']}/${post.id}`
                                : `/${cat.domain}/${post['SubCategory.domain']}/${post.id}`}><a>
                            <Row className='new-posts-post-row' key={`${cat.label}-contents-${index}`}>
                                {/* Title and MBTI */}
                                <Col span={18}>
                                    <span className='new-posts-title-span'>{post.title.length > 10 ? `${post.title.slice(0, 10)}...` : post.title}</span>
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
                    <Link href={category ? `/${category}/${cat.domain}` : `/${cat.domain}`}><a>
                        <div className='new-posts-more-div'>{"더보기 >"}</div>
                    </a></Link>
                </div>
            ))}
        </div>
    );
};

CategoryNewPosts.propTypes = {
    category: PropTypes.string,
};

export default CategoryNewPosts;