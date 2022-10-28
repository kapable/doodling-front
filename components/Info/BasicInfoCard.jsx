import { Button, Col, Dropdown, Form, Input, Menu, Row, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import { CHANGE_NICKNAME_AND_MBTI_REQUEST, CHECK_IS_FOLLOWING_REQUEST, CHECK_NICKNAME_DOUBLED_REQUEST, FOLLOW_REQUEST, LOG_OUT_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { DownOutlined, EditOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';
import { useEffect } from 'react';
import Link from 'next/link';

const BasicInfoCard = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { myInfo, userInfo, nicnameExist, isFollowing, checkNicknameDoubledLoading, checkNicknameDoubledDone, changeNicknameAndMbtiDone } = useSelector((state) => state.user);
    const { categoriesColorObj } = useSelector((state) => state.category);
    const [editMode, setEditMode] = useState(false);
    const [nickname, onChangeNickname, setNickname] = useInput(userInfo.nickname);
    const [nickDoubleChecked, setNickDoubleChecked] = useState(false);
    const [mbti, setMbti] = useState(userInfo.mbti);
    
    useEffect(() => {
        if(myInfo && myInfo?.id !== userInfo.id) {
            dispatch({
                type: CHECK_IS_FOLLOWING_REQUEST,
                data: { targetId: userInfo.id }
            });
        };
    }, [myInfo, userInfo]);

    const onClickLogoutButton = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
        alert('안전하게 로그아웃 되었습니다!');
        return router.replace('/');
    }, [LOG_OUT_REQUEST]);

    const onEditClick = useCallback(() => {
        setNickname(userInfo.nickname); // after edit cancel and reEdit
        setMbti(userInfo.mbti); // after edit cancel and reEdit
        setEditMode(!editMode);
    }, [editMode, userInfo]);

    const onNickDoubleCheck = useCallback((newNickname) => {
        if(!newNickname) {
            return alert('새로운 닉네임을 입력해주세요!');
        };
        dispatch({
            type: CHECK_NICKNAME_DOUBLED_REQUEST,
            data: { nickname }
        });
    }, [nickname]);

    useEffect(() => {
        let message = '';
        if(checkNicknameDoubledDone && userInfo.nickname !== nickname && nicnameExist === true) {
            message = '중복된 닉네임입니다 ㅠㅠ'
            return alert(message);
        }
        if(checkNicknameDoubledDone && nicnameExist === false) {
            message = '닉네임 중복 확인이 완료되었습니다!\n사용할 수 있는 닉네임입니다!'
            setNickDoubleChecked(true);
            return alert(message);
        }
    }, [nicnameExist, checkNicknameDoubledDone]);

    const onMBTIClick = useCallback((e) => {
        setMbti(e.key);
    }, [mbti]);

    const menu = (
        <Menu
            onClick={onMBTIClick}
            items={Object.keys(categoriesColorObj).map((type, _) => ({ label: type, key: type }))}
        />
    );

    const onFollowClick = useCallback(() => {
        if(!myInfo?.id) {
            return alert('팔로우를 하기 위해서는 로그인이 필요합니다!');
        };
        dispatch({
            type: FOLLOW_REQUEST,
            data: userInfo.id,
        });
    }, [userInfo.id, myInfo]);

    const onUnFollowClick = useCallback(() => {
        dispatch({
            type: UNFOLLOW_REQUEST,
            data: userInfo.id,
        });
    }, [userInfo.id]);

    const onEditSubmit = useCallback(() => {
        if(userInfo.nickname !== nickname && !nickDoubleChecked) { // if nickname changed but NOT doubleChecked
            return alert('닉네임 중복 확인을 해주세요!');
        };
        if(!mbti) {
            return alert('MBTI를 선택해주세요!');
        };
        dispatch({
            type: CHANGE_NICKNAME_AND_MBTI_REQUEST,
            data: { nickname, mbti }
        });
        setEditMode(false);
    }, [mbti, nickname, userInfo.nickname, nickDoubleChecked]);

    useEffect(() => { // if user nickname edited, change the current route
        if(changeNicknameAndMbtiDone && editMode === false && router.query.userNickname !== nickname) {
            router.replace(`/info/${nickname}`);
        };
    }, [changeNicknameAndMbtiDone, editMode, router, nickname]);

    const onEditCancel = useCallback(() => {
        setEditMode(false);
    }, []);

    return (
        <Row className='profile-basic-info-main-row'>
            <Col span={14}>
                <Row justify='start'>
                    <span className='info-span'>
                        <span className='nickname-span'>{userInfo.nickname}</span>&nbsp;
                        <span className='mbti-span' style={{ backgroundColor : categoriesColorObj[userInfo.mbti]}}>{userInfo.mbti}</span>
                        <br />
                    <span className='email-span'>{userInfo.email}</span></span></Row>
                <Row justify='start'>
                    {myInfo?.id === userInfo.id
                    ? (
                        editMode
                        ? (
                            <Form onFinish={onEditSubmit}>
                                <Input.Search value={nickname} required onChange={onChangeNickname} onSearch={onNickDoubleCheck} loading={checkNicknameDoubledLoading} enterButton={userInfo.nickname === nickname ? null : '중복 확인'} maxLength={20} showCount/>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Button className='signup-user-mbti-button'>
                                        <Space>
                                            {mbti ? mbti : 'MBTI'}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                                <br />
                                <Button type='primary' htmlType="submit">수정 확인</Button><Button type="dashed" onClick={onEditCancel}>수정 취소</Button>
                            </Form>
                        )
                        : <Button className='edit-btn' type="dashed" onClick={onEditClick}><EditOutlined /> 내 정보 수정</Button>
                    )
                    : (
                        isFollowing
                        ? <Button type='primary' className='follow-btn' onClick={onUnFollowClick}><UserDeleteOutlined /> 팔로우 취소</Button>
                        : <Button className='follow-btn' onClick={onFollowClick}><UserAddOutlined /> 팔로우 하기</Button>
                        
                    )}
                </Row>
            </Col>
            <Col span={10}>
                <Row justify='center'>
                    <Col className='follower-span'>
                        <Link href={`/info/${userInfo.nickname}/follower`}><a>{userInfo.followers}<br />팔로워</a></Link>
                    </Col>
                    <Col className='following-span'>
                        <Link href={`/info/${userInfo.nickname}/following`}><a>{userInfo.followings}<br />팔로잉</a></Link>
                    </Col>
                </Row>
                <Row justify='center' align='bottom'>
                    {myInfo?.id && myInfo?.id === userInfo?.id ? <Button className='logout-btn' onClick={onClickLogoutButton}>로그아웃</Button> : null}
                </Row>
            </Col>
        </Row>
    );
};

export default BasicInfoCard;