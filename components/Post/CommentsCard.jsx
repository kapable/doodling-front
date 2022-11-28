import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { useCallback } from 'react';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
import * as gtag from '../../lib/gtag';

const CommentsCard = ({ contents }) => {
    const { myInfo, addCommentLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    const onSubmitComment = useCallback(() => {
        try {
            gtag.event({ action: "Click Submit Comment Button", category: "Posting", label: "article page" });
            dispatch({
                type: ADD_COMMENT_REQUEST,
                data: { postId: contents.id, text: commentText }
            });
            setCommentText('');
        } catch {
            return alert('댓글을 다는 중 에러가 발생했습니다 ㅠㅠ');
        }
    }, [contents, commentText]);

    return (
        <div className='post-comment-form-div'>
            <Form onFinish={onSubmitComment}>
                <Form.Item>
                    <Row className='post-comment-form-row'>
                        <Col span={20}>
                            <Input.TextArea
                                placeholder={myInfo?.id ? '댓글을 입력해주세요(최대 140자)' : '로그인 후 댓글 입력이 가능합니다.'}
                                allowClear
                                maxLength={140}
                                showCount
                                autoSize={{maxRows: 3}}
                                value={commentText}
                                onChange={onChangeCommentText}
                                disabled={myInfo?.id ? false : true}
                            />
                        </Col>
                        <Col span={4}>
                            <Button
                                className='post-comment-submit-button'
                                type='primary'
                                htmlType='submit'
                                loading={addCommentLoading}
                                disabled={myInfo?.id ? false : true}
                            >등록</Button>
                        </Col>
                    </Row>
                </Form.Item>
                <p className='post-comment-form-comment'>* 타인에게 불쾌감을 주는 욕설, 모욕적인 표현 등은 표기 불가 텍스트로 지정되어 노출이 제한됩니다.</p>
            </Form>
        </div>
    );
};

CommentsCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default CommentsCard;