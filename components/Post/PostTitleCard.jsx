import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { BellFilled, BellOutlined, EditOutlined, LikeOutlined, LikeFilled, CommentOutlined, LinkOutlined, TagOutlined, BookOutlined, BookFilled, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const PostTitleCard = ({ contents }) => {
    const dispatch = useDispatch();
    const { myInfo } = useSelector((state) => state.user);
    const { title, createdAt, views, PostLikers, User } = contents;
    const [dateTime, setDateTime] = useState();
    const [likeClick, setLikeClick] = useState(false);

    // setting post's dateTime
    useEffect(() => {
        dayjs(createdAt).diff(dayjs(), 'hours') < -12
        ? setDateTime(dayjs(createdAt).format('YYYY-MM-DD'))
        : setDateTime(dayjs(createdAt).fromNow())
    }, [createdAt]);

    useEffect(() => {
        let likeClicked;
        myInfo?.id // SSR needed
        ? likeClicked = true // myInfo.PostLiked array contains this article id?
        : likeClicked = false;
        setLikeClick(likeClicked);
    }, [myInfo]);

    const onLikeClick = useCallback(() => {
        console.log('clickedLike');
    }, []);

    return (
        <Fragment>
            <Row className='post-title-header-main-row'>
                <Col className='post-title-header-left-col' span={16}>
                    <Row><p className='post-title-p'>{title}</p></Row>
                    <Row className='post-basic-info-row'>
                        <p>{dateTime}</p>
                        <p className='post-title-header-type'>조회수 {views}</p>
                        <p><span className='post-like-btn-span' onClick={onLikeClick}>
                            {likeClick ? <LikeFilled /> : <LikeOutlined />}
                        </span> {PostLikers}</p>
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