import { Col, Row } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import { LikeFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const NewPosts = () => {
    const { categoryNew15Posts } = useSelector((state) => state.posts);
    return (
        <div className='category-new-15-posts-div'>
            {categoryNew15Posts.map((post) => (
                <Row key={`${post.id}-newPost`}>
                    <Col span={18}>
                        <Row>{post.title}</Row>
                        <Row>
                            <span>조회수</span>
                            <span><LikeFilled /></span>
                            <span>{post?.User?.nickname}</span>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>{dayjs(post.createdAt).diff(dayjs(), 'hours') < -240
                                    ? dayjs(post.createdAt).format('YYYY-MM-DD')
                                    : dayjs(post.createdAt).fromNow()}
                        </Row>
                    </Col>
                </Row>
            ))}
        </div>
    );
};

export default NewPosts;