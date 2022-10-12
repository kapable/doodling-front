import { Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const CategoryNewPosts = () => {
    const { categoryNewPosts } = useSelector((state) => state.posts);

    return (
        <Fragment>
            {console.log(categoryNewPosts)}
            {categoryNewPosts.slice().sort((a, b) => (parseFloat(a.id) - parseFloat(b.id))) // sorting by category ID ASC
            .map((cat) => (
                <div key={`${cat.label}-div`} style={{ padding: '1.5rem'}}>
                    <div key={`${cat.label}-div2`}>{cat.label}</div>
                    {cat.posts.length > 0
                    ? (cat.posts.map((post, index) => (
                        <Row key={`${cat.label}-contents-${index}`}>
                            <Col>{post.title.length > 15 ? `${post.title.slice(0, 15)}...` : post.title}</Col>
                            <Col>{post['User.mbti']}</Col>
                            <Col>{dayjs(post.createdAt).diff(dayjs(), 'hours') < -24
                                ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                : dayjs(post.createdAt).fromNow()}</Col>
                        </Row>
                    )))
                    : (<p>신규 포스트가 없습니다.</p>)
                    }
                </div>
            ))}
        </Fragment>
    );
};

export default CategoryNewPosts;