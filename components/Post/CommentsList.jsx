import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Comment, Form, Input, List, Pagination, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ADD_RECOMMENT_REQUEST, LIKE_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, REMOVE_COMMENT_REQUEST, UNLIKE_COMMENT_REQUEST } from '../../reducers/post';
import { useState } from 'react';
import useInput from '../../hooks/useInput';
import { CheckCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const CommentsList = ({ postId, comments, userId, postComments }) => {
    const dispatch = useDispatch();
    const { categoriesColorObj } = useSelector((state) => state.category);
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const { hasMoreComments } = useSelector((state) => state.post);

    const [reCommentTargetId, setReCommentTargetId] = useState();
    const [isReCommentOpen, setIsReCommentOpen] = useState(false);
    const [reCommentText, onReCommentText, setReCommentText] = useInput('');

    const [reCommentListTargetId, setReCommentListTargetId] = useState();
    const [isReCommentListOpen, setIsReCommentListOpen] = useState(false);

    const [commentLikeTargetId, setCommentLikeTargetId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onRemoveCommentClick = (commentId) => () => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 댓글은 복구가 불가능합니다.") === true) {
            dispatch({
                type: REMOVE_COMMENT_REQUEST,
                data: { commentId }
            });
        };
    };

    const onReCommentListClick = (commentId) => () => {
        setReCommentListTargetId(commentId);
        reCommentListTargetId === commentId
        ? setIsReCommentListOpen(!isReCommentListOpen)
        : setIsReCommentListOpen(true)
    };

    const onReCommentClick = (commentId) => () => {
        if(!myInfo?.id) {
            return alert('로그인 후 댓글 입력이 가능합니다.');
        }
        setReCommentTargetId(commentId);
        reCommentTargetId === commentId
        ? setIsReCommentOpen(!isReCommentOpen)
        : setIsReCommentOpen(true)
    };

    const onReCommentSubmit = useCallback(() => {
        dispatch({
            type: ADD_RECOMMENT_REQUEST,
            data: { text: reCommentText, postId: postId, commentId: reCommentTargetId },
        });
        setReCommentText("");
        setIsReCommentOpen(false);
        setReCommentListTargetId(reCommentTargetId);
        setIsReCommentListOpen(true)
    }, [reCommentText, postId, reCommentTargetId]);

    const onCommentLikeClick = (commentId) => () => {
        if(!myInfo?.id) {
            return alert('좋아요를 누르려면 로그인이 필요합니다!');
        };
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
        
    };

    useEffect(() => {
        // if the loaded user(user own)'s CommentLiked list has the current comment id
        let commentLiked = [];
        if(userInfo?.id && userInfo.CommentLiked.length > 0) {
            commentLiked = userInfo.CommentLiked.map((comment) => comment.id || comment)
        }
        setCommentLikeTargetId(commentLiked);
    }, [userInfo]);

    const onPageChange = useCallback((e) => {
        setCurrentPage(e);
    }, []);

    useEffect(() => {
        if(currentPage % 2 === 0 && hasMoreComments) {
            const lastId = comments[comments.length - 1]?.id;
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: { postId, lastId },
            });
        };
    }, [currentPage, comments, postId, hasMoreComments]);

    return (
        <div className='post-comment-list-form'>
            <List
                itemLayout="horizontal"
                dataSource={comments.slice((currentPage-1)*5, (currentPage-1)*5+5)}
                header={<p>총 {postComments}개의 댓글 | <CheckCircleFilled /> 는 글쓴이의 댓글입니다.</p>}
                renderItem={item => (
                    <li>
                        <Comment
                            key={`${item.id}-comment`}
                            actions={[
                                <span onClick={onCommentLikeClick(item.id)} >{commentLikeTargetId.includes(item.id) ? <LikeFilled /> : <LikeOutlined />} {item.CommentLikers.length}</span>,
                                <span onClick={onReCommentClick(item.id)}>댓글달기</span>,
                                item?.ReComments.length > 0
                                ? <span onClick={onReCommentListClick(item.id)}>대댓글보기</span>
                                : null,
                                myInfo?.admin || item?.User?.id === myInfo?.id
                                ? <span onClick={onRemoveCommentClick(item.id)}>삭제하기</span>
                                : null,
                            ]}
                            author={[<Link href={`/info/${item.User?.nickname}`} key={`${item.User?.nickname}-link`}><p key="1-user">{item.UserId === userId ? <CheckCircleFilled /> : null} {item.User?.nickname}<span style={{backgroundColor: categoriesColorObj[item?.User?.mbti], color:"white", padding: "0 0.2rem", marginLeft:"0.2rem"}}>{item.User?.mbti}</span></p></Link>]}
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
                            {reCommentListTargetId === item.id && isReCommentListOpen && item?.ReComments.length > 0
                            ? (
                                <List
                                    itemLayout="horizontal"
                                    dataSource={item?.ReComments}
                                    renderItem={reComment => (
                                        <li>
                                            <Comment
                                                key={`${reComment?.text}-reComment`}
                                                author={[<Link href={`/info/${reComment.User?.nickname}`} key={`${reComment.User?.nickname}-link`}><p key="1-user">{reComment.UserId === userId ? <CheckCircleFilled /> : null} {reComment.User?.nickname}<span style={{backgroundColor: categoriesColorObj[reComment?.User?.mbti], color:"white", padding: "0 0.2rem", marginLeft:"0.2rem"}}>{reComment.User?.mbti}</span></p></Link>]}
                                                content={reComment.text}
                                                datetime={dayjs(reComment.createdAt).diff(dayjs(), 'hours') < -24
                                                    ? dayjs(reComment.createdAt).format('YYYY-MM-DD')
                                                    : dayjs(reComment.createdAt).fromNow()}
                                            />
                                        </li>
                                    )}
                                />
                            )
                            : (null)}
                        </ Comment>
                    </li>
                )}
            />
            <Pagination
                style={{width: "fit-content", margin: "1.5rem auto"}}
                className='post-page-comments-pagination'
                current={currentPage}
                showSizeChanger={false}
                total={postComments}
                onChange={onPageChange}
                defaultPageSize={5} />
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;