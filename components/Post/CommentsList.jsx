import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Comment, Form, Input, List, Pagination, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ADD_RECOMMENT_REQUEST, LIKE_COMMENT_REQUEST, UNLIKE_COMMENT_REQUEST } from '../../reducers/post';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { CheckCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';

const CommentsList = ({ postId, comments, userId }) => {
    const dispatch = useDispatch();
    const { categoriesColorObj } = useSelector((state) => state.category);
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const [reCommentTargetId, setReCommentTargetId] = useState();
    const [isReCommentOpen, setIsReCommentOpen] = useState(false);
    const [reCommentText, onReCommentText] = useInput('');
    const [commentLikeTargetId, setCommentLikeTargetId] = useState([]);

    const onReCommentClick = (commentId) => useCallback(() => {
        if(!myInfo?.id) {
            return alert('로그인 후 댓글 입력이 가능합니다.');
        }
        setReCommentTargetId(commentId);
        setIsReCommentOpen(!isReCommentOpen);
    }, [myInfo, isReCommentOpen]);

    const onReCommentSubmit = (commentId) => useCallback(() => {
        dispatch({
            type: ADD_RECOMMENT_REQUEST,
            data: { text: reCommentText, postId: postId, commentId: reCommentTargetId },
        });
    }, [reCommentText, postId, reCommentTargetId]);

    const onCommentLikeClick = (commentId) => useCallback(() => {
        // if(!myInfo?.id) {
        //     return alert('좋아요를 누르려면 로그인이 필요합니다!');
        // };
        commentLikeTargetId.includes(commentId)
        ? (
            dispatch({
                type: UNLIKE_COMMENT_REQUEST,
                data: { commentId }
            })
        )
        : (
            dispatch({
                type: LIKE_COMMENT_REQUEST,
                data: { commentId }
            })
        )
        
    }, [myInfo, commentLikeTargetId]);

    useEffect(() => {
        // if the loaded user(user own)'s CommentLiked list has the current comment id
        userInfo?.id && userInfo.CommentLiked.length > 0
        ? setCommentLikeTargetId(userInfo.CommentLiked.map((comment) => comment.id || commeent))
        : setCommentLikeTargetId([]);
    }, [userInfo]);

    return (
        <div className='post-comment-list-form'>
            <List
                itemLayout="horizontal"
                dataSource={comments}
                header={<p>{comments.length}개의 댓글 | <CheckCircleFilled /> 는 글쓴이의 댓글입니다.</p>}
                renderItem={item => (
                    <li>
                        <Comment
                            key={`${item.id}-comment`}
                            actions={[
                                <span onClick={onCommentLikeClick(item.id)} >{commentLikeTargetId.includes(item.id) ? <LikeFilled /> : <LikeOutlined />} {item.CommentLikers.length}</span>,
                                // <span onClick={onReCommentClick(item.id)}>댓글달기</span>
                            ]}
                            author={[<p key="1-user">{item.UserId === userId ? <CheckCircleFilled /> : null} {item.User.nickname}<span style={{backgroundColor: categoriesColorObj[item.User.mbti], color:"white", padding: "0 0.2rem", marginLeft:"0.2rem"}}>{item.User.mbti}</span></p>]}
                            content={item.text}
                            datetime={dayjs(item.createdAt).diff(dayjs(), 'hours') < -24
                                ? dayjs(item.createdAt).format('YYYY-MM-DD')
                                : dayjs(item.createdAt).fromNow()}
                        >
                            {reCommentTargetId === item.id && isReCommentOpen
                            ? (
                                <Form onFinish={onReCommentSubmit}>
                                    <Form.Item>
                                        <Row>
                                            <Col span={20}>
                                                <Input.TextArea
                                                    placeholder={myInfo?.id ? '댓글을 입력해주세요(최대 140자)' : '로그인 후 댓글 입력이 가능합니다.'}
                                                    allowClear
                                                    maxLength={140}
                                                    showCount
                                                    autoSize={{maxRows: 3}}
                                                    value={reCommentText}
                                                    onChange={onReCommentText}
                                                    disabled={myInfo?.id ? false : true}
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <Button
                                                    type='primary'
                                                    htmlType='submit'
                                                    disabled={myInfo?.id ? false : true}
                                                >달기</Button>
                                            </Col>     
                                        </Row>
                                    </Form.Item>
                                    <p>* 타인에게 불쾌감을 주는 욕설, 모욕적인 표현 등은 표기 불가 텍스트로 지정되어 노출이 제한됩니다.</p>
                                </Form>
                            )
                            : (null)}
                            {/* <Comment /> */}
                        </ Comment>
                    </li>
                )}
            />
            {/* <Pagination responsive style={{width: "fit-content", margin: "1.5rem auto"}} pageSize={3} total={15} /> */}
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;