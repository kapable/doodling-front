import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { EditOutlined, LikeOutlined, LikeFilled, CommentOutlined, LinkOutlined, TagOutlined, BookOutlined, BookFilled, DeleteOutlined, LoadingOutlined, AlertOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ENABLE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';

const PostTitleCard = ({ contents }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const { title, createdAt, views, PostLikers, User } = contents;
    const [dateTime, setDateTime] = useState();
    const [likeClick, setLikeClick] = useState(false);

    // setting post's dateTime
    useEffect(() => {
        dayjs(createdAt).diff(dayjs(), 'hours') < -24
        ? setDateTime(dayjs(createdAt).format('YYYY-MM-DD'))
        : setDateTime(dayjs(createdAt).fromNow())
    }, [createdAt]);

    useEffect(() => {
        // if the loaded user(user own)'s PostLiked list has the current post id
        userInfo?.id && userInfo.PostLiked.length > 0 && userInfo.PostLiked.find((p) => p.id === contents.id)
        ? setLikeClick(true)
        : setLikeClick(false)
    }, [userInfo, contents]);

    const onLikeClick = useCallback(() => {
        if(!myInfo?.id) {
            return alert('좋아요를 누르려면 로그인이 필요합니다!');
        };
        dispatch({
            type: LIKE_POST_REQUEST,
            data: { postId : contents.id }
        });
    }, [contents, myInfo]);

    const onUnLikeClick = useCallback(() => {
        if(!myInfo?.id) {
            return alert('로그인이 필요합니다!');
        };
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: { postId : contents.id }
        });
    }, [contents, myInfo]);

    const onUserClick = (userNickname) => useCallback(() => {
        router.push(`/info/${userNickname}`);
    }, [])

    const onReportClick = useCallback(() => {
        alert('신고 기능은 준비중입니다!');
    }, []);

    const onEditClick = useCallback(() => {
        router.push(`/edit/${contents.id}`);
    }, [contents]);

    const onDeleteClick = useCallback(() => {
        dispatch({
            type: ENABLE_POST_REQUEST,
            data: { postId: contents.id, checked: false },
        })
    }, [contents]);

    return (
        <Fragment>
            <Row className='post-title-header-main-row'>
                <Col span={24}>
                    <Row><p className='post-title-p'>{title}</p></Row>
                    <Row align='middle'>
                        <Col span={24}>
                            <Row justify='start' >
                                <span style={{ backgroundColor : categoriesColorObj[User?.mbti]}} className='post-user-mbti-span'>{User?.mbti}</span>&nbsp;
                                <span className='post-user-nickname-span' onClick={onUserClick(User?.nickname)}>{User?.nickname}</span>
                            </Row>
                        </Col>
                    </Row>
                    <Row align='middle'>
                        <Col span={24}  className='post-basic-info-col'>
                            <Row align='middle' justify='end' >
                                <span className='post-basic-info-span'>{dateTime}</span>
                                <span className='post-basic-info-span'>조회수 {views}</span>
                                <span className='post-basic-info-span'>
                                    {likeClick
                                    ? <span className='post-like-btn-span' onClick={onUnLikeClick}><LikeFilled /></span>
                                    : <span className='post-like-btn-span' onClick={onLikeClick}><LikeOutlined /></span>}
                                {PostLikers}</span>
                                <span className='post-title-header-alert'>
                                    {myInfo?.id === User?.id
                                    ? (
                                        <>
                                            <span className='post-edit-btn-span' onClick={onEditClick}><EditOutlined /> 수정</span>
                                            <span className='post-delete-btn-span' onClick={onDeleteClick}><DeleteOutlined /> 삭제</span>
                                        </>)
                                    : <span className='post-report-btn-span' onClick={onReportClick}><AlertOutlined /> 신고</span>
                                    }
                                </span>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Fragment>
    );
};

PostTitleCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default PostTitleCard;