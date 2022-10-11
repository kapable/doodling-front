import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { BellFilled, BellOutlined, EditOutlined, LikeOutlined, LikeFilled, CommentOutlined, LinkOutlined, TagOutlined, BookOutlined, BookFilled, DeleteOutlined, LoadingOutlined, AlertOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import { LOAD_USER_INFO_REQUEST } from '../../reducers/user';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const PostTitleCard = ({ contents }) => {
    const dispatch = useDispatch();
    const { myInfo, userInfo, loadUserInfoDone } = useSelector((state) => state.user);
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
        if(myInfo?.id) {
            dispatch({
                type: LOAD_USER_INFO_REQUEST,
                data: myInfo.id,
            });
        }
    }, [myInfo]);

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

    const onReportClick = useCallback(() => {
        console.log('clickedReport');
    }, []);

    const onDeleteClick = useCallback(() => {
        console.log('clickedDelete');
    }, []);

    return (
        <Fragment>
            <Row className='post-title-header-main-row'>
                <Col className='post-title-header-left-col' span={16}>
                    <Row><p className='post-title-p'>{title}</p></Row>
                    <Row className='post-basic-info-row'>
                        <p>{dateTime}</p>
                        <p>조회수 {views}</p>
                        <p>
                            {likeClick
                            ? <span className='post-like-btn-span' onClick={onUnLikeClick}><LikeFilled /></span>
                            : <span className='post-like-btn-span' onClick={onLikeClick}><LikeOutlined /></span>}
                        &nbsp;{PostLikers}</p>
                    </Row>
                </Col>
                <Col className='post-title-header-right-col' span={8}>
                    <Row><p className='post-title-header-alert'>
                            {myInfo?.id === User?.id
                            ? <span className='post-delete-btn-span' onClick={onDeleteClick}><DeleteOutlined /> 삭제하기</span> // ssr needed
                            : <span className='post-report-btn-span' onClick={onReportClick}><AlertOutlined /> 신고하기</span>//<span><br /></span>
                            }
                        </p></Row>
                    <Row><p className='post-title-header-user'>{User?.nickname} <span style={{ backgroundColor : categoriesColorObj[User?.mbti]}} className='post-user-mbti-span'>{User?.mbti}</span></p></Row>
                </Col>
            </Row>
        </Fragment>
    );
};

PostTitleCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default PostTitleCard;