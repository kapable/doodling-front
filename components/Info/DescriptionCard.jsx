import { CommentOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Input, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CHANGE_DESCRIPTION_REQUEST } from '../../reducers/user';

const DescriptionCard = () => {
    const dispatch = useDispatch();
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const [description, onChangeDescription, setDescription] = useInput(userInfo?.description);
    const [editMode, setEditMode] = useState(false);

    const onEditClick = useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    const onEditSubmit = useCallback(() => {
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
                    <Input.Search
                        className='user-description-edit-input'
                        value={description}
                        onChange={onChangeDescription}
                        addonBefore="소개"
                        enterButton="수정"
                        onSearch={onEditSubmit}
                    />
                )
                : <p className='description-p'>{description || `멋진 소개가 필요해요!`}</p>
                }
            </Col>
            {myInfo?.id === userInfo?.id
            ? <Col span={4} className='edit-row'><EditOutlined onClick={onEditClick} className='edit-icon'/></Col>
            : <Col span={4}></Col>}
        </Row>
    );
};

export default DescriptionCard;