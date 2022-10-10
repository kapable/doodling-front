import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { BellFilled, BellOutlined, EditOutlined, LikeOutlined, LikeFilled, CommentOutlined, LinkOutlined, TagOutlined, BookOutlined, BookFilled, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const PostTitleCard = ({ contents }) => {
    const { title, createdAt, views, PostLikers, User } = contents;
    const [dateTime, setDateTime] = useState();

    // setting post's dateTime
    useEffect(() => {
        dayjs(createdAt).diff(dayjs(), 'day') > 0
        ? setDateTime(dayjs(createdAt).format('YYYY-MM-dd'))
        : setDateTime(dayjs(createdAt).fromNow())
    }, [createdAt]);

    return (
        <Fragment>
            <Row className='post-title-header-main-row'>
                <Col className='post-title-header-left-col' span={16}>
                    <Row><p className='post-title-p'>{title}</p></Row>
                    <Row className='post-basic-info-row'>
                        <p>{dateTime}</p>
                        <p className='post-title-header-type'>조회수 {views}</p>
                        <p><LikeOutlined /> {PostLikers}</p>
                    </Row>
                </Col>
                <Col className='post-title-header-right-col' span={8}>
                    <Row><p className='post-title-header-type'>REPORT</p></Row>
                    <Row><p className='post-title-header-type'>{User?.nickname} {User?.mbti}</p></Row>
                </Col>
            </Row>
        </Fragment>
    );
};

PostTitleCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default PostTitleCard;