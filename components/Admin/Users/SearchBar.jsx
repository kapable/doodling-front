import { Col, Input, Row } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_INFO_REQUEST } from '../../../reducers/user';

const SearchBar = () => {
    const dispatch = useDispatch();
    const { loadUserInfoLoading } = useSelector((state) => state.user);

    const onUserSearch = useCallback((nickname) => {
        dispatch({
            type: LOAD_USER_INFO_REQUEST,
            data: nickname
        })
    }, []);

    return (
        <Row className='admin-users-search-bar-row'>
            <Col span={24}>
                <Input.Search placeholder='찾고 싶은 유저의 닉네임을 넣어주세요' allowClear enterButton size='large' onSearch={onUserSearch} loading={loadUserInfoLoading} />
            </Col>
        </Row>
    );
};

export default SearchBar;