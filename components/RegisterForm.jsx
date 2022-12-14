import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Form, Input, Dropdown, Row, Col, Space, Menu } from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { CHECK_EMAIL_DOUBLED_REQUEST, CHECK_NICKNAME_DOUBLED_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
    const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
    const { myInfo, signUpLoading, signUpDone, signUpError, checkNicknameDoubledDone, checkNicknameDoubledLoading, nicnameExist, checkEmailDoubledDone, checkEmailDoubledLoading, emailExist } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [emailDoubleChecked, setEmailDoubleChecked] = useState(false);

    const [nickname, setNickname] = useState('');
    const [nickDoubleChecked, setNickDoubleChecked] = useState(false);

    const [myMBTI, setMyMBTI] = useState('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const onMBTIClick = useCallback((e) => {
        setMyMBTI(e.key);
    }, [myMBTI]);

    const categories = ['ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP', 'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP'];
    const menu = (
        <Menu
            onClick={onMBTIClick}
            items={categories.map((type, _) => ({ label: type, key: type }))}
        />
    );

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password],
    );

    const onChangeEmail = useCallback((e) => {
        setEmailDoubleChecked(false);
        setEmail(e.target.value.replace(/[^a-zA-Z0-9@.]/gi, ''));
    }, [])

    const onEmailDoubleCheck = useCallback((newEmail) => {
        if(email.match(emailRegex) === null) {
            return alert('????????? ???????????? ??????????????????!');
        }
        if(!newEmail) {
            return alert('???????????? ??????????????????!');
        };
        dispatch({
            type: CHECK_EMAIL_DOUBLED_REQUEST,
            data: { email : email }
        });
    }, [email, emailRegex]);

    useEffect(() => {
        let message = '';
        if(checkEmailDoubledDone && emailExist === true) {
            message = '????????? ?????????????????? ??????'
            return alert(message);
        }
        if(checkEmailDoubledDone && emailExist === false) {
            message = '????????? ?????? ????????? ?????????????????????!\n????????? ??? ?????? ??????????????????!'
            setEmailDoubleChecked(true);
            return alert(message);
        }
    }, [emailExist, checkEmailDoubledDone]);

    const onChangeNickname = useCallback((e) => {
        setNickDoubleChecked(false);
        setNickname(e.target.value.replace(reg, ''));
    }, [])

    const onNickDoubleCheck = useCallback((newNickname) => {
        if(!newNickname) {
            return alert('???????????? ??????????????????!');
        };
        dispatch({
            type: CHECK_NICKNAME_DOUBLED_REQUEST,
            data: { nickname }
        });
    }, [nickname]);

    useEffect(() => {
        let message = '';
        if(checkNicknameDoubledDone && nicnameExist === true) {
            message = '????????? ?????????????????? ??????'
            return alert(message);
        }
        if(checkNicknameDoubledDone && nicnameExist === false) {
            message = '????????? ?????? ????????? ?????????????????????!\n????????? ??? ?????? ??????????????????!'
            setNickDoubleChecked(true);
            return alert(message);
        }
    }, [nicnameExist, checkNicknameDoubledDone]);
    
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback(
        (e) => {
            setTerm(e.target.checked);
            setTermError(false);
        },
        [],);

    const onSubmit = useCallback(
        () => {
            if(!nickDoubleChecked) {
                return alert('????????? ?????? ????????? ????????????!');
            };
            if(!emailDoubleChecked) {
                return alert('????????? ?????? ????????? ????????????!');
            };
            if(password !== passwordCheck) {
                return setPasswordError(true);
            };
            if(passwordError) {
                return alert('???????????? ???????????? ????????????!');
            };
            if(myMBTI === '') {
                return alert('MBTI??? ??????????????????!');
            };
            if(!term) {
                return setTermError(true);
            };
            dispatch({
                type: SIGN_UP_REQUEST,
                data: { email, nickname, mbti: myMBTI, password }
            });
        },
        [password, passwordCheck, setPasswordError, term, setTermError, email, nickname, myMBTI, nickDoubleChecked],
    );

    useEffect(() => {
        if(myInfo?.id) {
            Router.push('/');
        };
    }, [myInfo]);

    useEffect(() => {
        if (signUpDone) {
            alert("??????????????? ??????????????????!");
            Router.replace('/login');
        };

        if (signUpError) {
            alert('???????????? ????????? ??????????????????. ?????? ?????????????????? ??????');
        };
    }, [signUpDone, signUpError]);

    return (
        <div className='signup-div'>
            <div className='signup-header'>
                <img src={'https://images.doodling.kr/basic/doodling-logo.png'} alt='????????????' />
                <p>???????????? MBTI ????????? ?????? ????????????<br />????????? ?????? ??????????????? ????????????<br />MBTI ???????????? ??????????????????.</p>
            </div>
            <Form onFinish={onSubmit} layout="vertical" className='signup-form'>
                <div>
                    <Form.Item htmlFor="user-email" required label="?????????">
                        <Row>
                            <Col span={emailDoubleChecked ? 24 : 18}>
                                <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} showCount maxLength={50}/>
                            </Col>
                            <Col span={emailDoubleChecked ? 0 : 6}>
                                <Button type='primary' onClick={onEmailDoubleCheck}>{emailDoubleChecked ? null : '?????? ??????'}</Button>
                            </Col>
                        </Row>
                        
                        {/* <Input.Search name="user-email" type="email" value={email} required onChange={onChangeEmail} onSearch={onEmailDoubleCheck} enterButton={emailDoubleChecked ? null : '?????? ??????'}  /> */}
                    </Form.Item>
                </div>
                <div>
                    <Form.Item htmlFor="user-password" required label="????????????">
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item htmlFor="user-password-check" required label="???????????? ?????????">
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                        />
                    </Form.Item>
                    {passwordError && <div className='sign-up-error-message-div'>??????????????? ???????????? ????????????.</div>}
                </div>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item htmlFor="user-nick" required label="?????????">
                            <Row>
                                <Col span={nickDoubleChecked ? 24 : 18}>
                                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname} maxLength={20} showCount/>
                                </Col>
                                <Col span={nickDoubleChecked ? 0 : 6}>
                                    <Button type='primary' onClick={onNickDoubleCheck} loading={checkNicknameDoubledLoading}>{nickDoubleChecked ? null : '?????? ??????'}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item htmlFor="user-nick" required label="??? MBTI(?????? ?????? ??????)">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Button className='signup-user-mbti-button'>
                                    <Space>
                                        {myMBTI ? myMBTI : 'MBTI'}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </Form.Item>
                    </Col>
                </Row>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>(??????) ?????? ??? ????????? ?????????????????? ????????? ???????????????.</Checkbox>
                    {termError && <div className='sign-up-error-message-div'>???????????????????????? ?????? ??? ????????? ???????????????.</div>}
                </div>
                <div>
                    <Button className='signup-form-button' htmlType="submit" >{signUpLoading ? <LoadingOutlined /> : "????????????"}</Button>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;