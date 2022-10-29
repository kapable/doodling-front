import { Col, Row, Space, Table } from 'antd';
import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_USER_ADMIN_REQUEST, SET_USER_ENABLE_REQUEST } from '../../../reducers/user';

const { Column } = Table;

const ResultUser = () => {
    const dispatch = useDispatch();
    const { userInfo, loadUserInfoError } = useSelector((state) => state.user);

    const onRemoveAdmin = useCallback((userId) => {
        if (confirm("정말로 어드민 권한을 회수하시겠습니까?") === true) {
            dispatch({
                type: SET_USER_ADMIN_REQUEST,
                data: { userId, checked: false }
            });
        };
    }, []);

    const onAddAdmin = useCallback((userId) => {
        if (confirm("정말로 어드민 권한을 부여하시겠습니까?\n어드민은 모든 권한을 가질 수 있습니다.") === true) {
            dispatch({
                type: SET_USER_ADMIN_REQUEST,
                data: { userId, checked: true }
            });
        }
    }, []);

    const onRemoveUser = useCallback((userId) => {
        if (confirm("정말로 유저를 삭제하시겠습니까?\n유저가 쓴 글도 함께 삭제됩니다.") === true) {
            dispatch({
                type: SET_USER_ENABLE_REQUEST,
                data: { userId, checked: false }
            });
        }
    }, []);

    const onReviveUser = useCallback((userId) => {
        if (confirm("정말로 유저를 복구하시겠습니까?\n유저가 쓴 글도 함께 복구됩니다.") === true) {
            dispatch({
                type: SET_USER_ENABLE_REQUEST,
                data: { userId, checked: true }
            });
        }
    }, []);

    return (
        <Row className='admin-users-result-row'>
            <Col span={24}>
                {loadUserInfoError
                ? (<p>{loadUserInfoError}</p>)
                : (
                    
                    <Table pagination={false} dataSource={[userInfo]} key="table" rowKey={user => user.id}>
                        <Column title='ID' dataIndex='id' key='user-id' />
                        <Column title='닉네임' dataIndex='nickname' key='user-id' />
                        <Column title='어드민' dataIndex='admin' render={(_ , user) => (
                            <Space size='middle'>
                                {userInfo?.id
                                ? (<a onClick={user?.admin ? () => onRemoveAdmin(user.id)  : () => onAddAdmin(user.id)}>{user?.admin ? '권한 뺏기' : '권한 주기'}</a>)
                                : (null)
                                }
                            </Space>
                        )} />
                        <Column title='상태' dataIndex='enabled' render={(_, user) => (
                            <Space size='middle'>
                                {userInfo?.id
                                ? (<a onClick={user?.enabled ? () => onRemoveUser(user.id) : () => onReviveUser(user.id)}>{user?.enabled ? '삭제' : '복구'}</a>)
                                : (null)
                                }
                            </Space>
                        )} />
                    </Table>
                )}
            </Col>
        </Row>
    )
};

export default ResultUser;