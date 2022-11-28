import { CloseOutlined, CommentOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React, { Fragment, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CHANGE_DESCRIPTION_REQUEST } from '../../reducers/user';
import * as gtag from '../../lib/gtag';

const DescriptionCard = () => {
    const dispatch = useDispatch();
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const [description, onChangeDescription, setDescription] = useInput(userInfo?.description);
    const [editMode, setEditMode] = useState(false);

    const onEditClick = useCallback(() => {
        gtag.event({ action: "Click Edit My Desc Button", category: "Posting", label: "profile page" });
        setEditMode(!editMode);
    }, [editMode]);

    const onEditSubmit = useCallback(() => {
        gtag.event({ action: "Submit My Desc", category: "Posting", label: "profile page" });
        dispatch({
            type: CHANGE_DESCRIPTION_REQUEST,
            data: { description },
        });
        alert('소개 수정이 완료되었습니다!');
        setEditMode(false);
    }, [description]);

    return (
        <Row justify='center' align='middle' className='profile-description-main-row'>
            <Col span={4} className='icon-row'><CommentOutlined className='description-icon' /></Col>
            <Col span={16} className='description-row'>
                {editMode && myInfo?.id === userInfo?.id
                ?  (
                    <Fragment>
                        <Input.TextArea
                            value={description}
                            onChange={onChangeDescription}
                            placeholder="멋진 소개를 해주세요!"
                            autoSize={{ minRows: 3, maxRows: 5, }}
                            maxLength={100}
                            // showCount
                            bordered
                            
                        />
                        <Button style={{ float: 'right'}} onClick={onEditSubmit} type='primary'>수정 완료</Button>
                    </Fragment>
                )
                : <p className='description-p'>{description || `멋진 소개가 필요해요!`}</p>
                }
            </Col>
            {myInfo?.id === userInfo?.id
            ? <Col span={4} className='edit-row'>
                {editMode
                ? <CloseOutlined onClick={onEditClick} className='edit-icon'/>
                : <EditOutlined onClick={onEditClick} className='edit-icon'/>
                }
                </Col>
            : <Col span={4}></Col>}
        </Row>
    );
};

export default DescriptionCard;