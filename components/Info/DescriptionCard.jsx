import { CommentOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const DescriptionCard = () => {
    const { userInfo } = useSelector((state) => state.user);

    return (
        <Row justify='center' align='middle' className='profile-description-main-row'>
            <Col span={4} className='icon-row'><CommentOutlined className='description-icon' /></Col>
            <Col span={16} className='description-row'><p className='description-p'>{userInfo.description || `멋진 소개가 필요해요!`}</p></Col>
            <Col span={4} className='edit-row'><EditOutlined className='edit-icon'/></Col>
        </Row>
    );
};

export default DescriptionCard;