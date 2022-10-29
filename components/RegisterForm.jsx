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
            return alert('유효한 이메일을 입력해주세요!');
        }
        if(!newEmail) {
            return alert('이메일을 입력해주세요!');
        };
        dispatch({
            type: CHECK_EMAIL_DOUBLED_REQUEST,
            data: { email : email }
        });
    }, [email, emailRegex]);

    useEffect(() => {
        let message = '';
        if(checkEmailDoubledDone && emailExist === true) {
            message = '가입된 이메일입니다 ㅠㅠ'
            return alert(message);
        }
        if(checkEmailDoubledDone && emailExist === false) {
            message = '이메일 중복 확인이 완료되었습니다!\n사용할 수 있는 이메일입니다!'
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
            return alert('닉네임을 입력해주세요!');
        };
        dispatch({
            type: CHECK_NICKNAME_DOUBLED_REQUEST,
            data: { nickname }
        });
    }, [nickname]);

    useEffect(() => {
        let message = '';
        if(checkNicknameDoubledDone && nicnameExist === true) {
            message = '중복된 닉네임입니다 ㅠㅠ'
            return alert(message);
        }
        if(checkNicknameDoubledDone && nicnameExist === false) {
            message = '닉네임 중복 확인이 완료되었습니다!\n사용할 수 있는 닉네임입니다!'
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
                return alert('닉네임 중복 확인을 해주세요!');
            };
            if(!emailDoubleChecked) {
                return alert('이메일 중복 확인을 해주세요!');
            };
            if(password !== passwordCheck) {
                return setPasswordError(true);
            };
            if(passwordError) {
                return alert('패스워드 재확인을 해주세요!');
            };
            if(myMBTI === '') {
                return alert('MBTI를 선택해주세요!');
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
            alert("회원가입에 성공했습니다!");
            Router.replace('/login');
        };

        if (signUpError) {
            alert('회원가입 에러가 발생했습니다. 다시 시도해주세요 ㅠㅠ');
        };
    }, [signUpDone, signUpError]);

    return (
        <div className='signup-div'>
            <div className='signup-header'>
                <img src={'https://images.doodling.kr/basic/doodling-logo.png'} alt='케이퍼니' />
                <p>두들링은 MBTI 성향이 다른 서로에게<br />궁금한 점을 물어보거나 소통하는<br />MBTI 커뮤니티 사이트입니다.</p>
            </div>
            <Form onFinish={onSubmit} layout="vertical" className='signup-form'>
                <div>
                    <Form.Item htmlFor="user-email" required label="이메일">
                        <Row>
                            <Col span={emailDoubleChecked ? 24 : 18}>
                                <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} showCount maxLength={50}/>
                            </Col>
                            <Col span={emailDoubleChecked ? 0 : 6}>
                                <Button type='primary' onClick={onEmailDoubleCheck}>{emailDoubleChecked ? null : '중복 확인'}</Button>
                            </Col>
                        </Row>
                        
                        {/* <Input.Search name="user-email" type="email" value={email} required onChange={onChangeEmail} onSearch={onEmailDoubleCheck} enterButton={emailDoubleChecked ? null : '중복 확인'}  /> */}
                    </Form.Item>
                </div>
                <div>
                    <Form.Item htmlFor="user-password" required label="비밀번호">
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item htmlFor="user-password-check" required label="비밀번호 재확인">
                        <Input
                            name="user-password-check"
                            type="password"
                            value={passwordCheck}
                            required
                            onChange={onChangePasswordCheck}
                        />
                    </Form.Item>
                    {passwordError && <div className='sign-up-error-message-div'>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <Row gutter={8}>
                    <Col span={24}>
                        <Form.Item htmlFor="user-nick" required label="닉네임">
                            <Row>
                                <Col span={nickDoubleChecked ? 24 : 18}>
                                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname} maxLength={20} showCount/>
                                </Col>
                                <Col span={nickDoubleChecked ? 0 : 6}>
                                    <Button type='primary' onClick={onNickDoubleCheck} loading={checkNicknameDoubledLoading}>{nickDoubleChecked ? null : '중복 확인'}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item htmlFor="user-nick" required label="내 MBTI(항시 변경 가능)">
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
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>(필수) 체크 후 가입시 개인정보활용 방침에 동의합니다.</Checkbox>
                    {termError && <div className='sign-up-error-message-div'>개인정보활용방침 동의 후 가입이 가능합니다.</div>}
                </div>
                <div>
                    <Button className='signup-form-button' htmlType="submit" >{signUpLoading ? <LoadingOutlined /> : "회원가입"}</Button>
                </div>
            </Form>
        </div>
    );
};

export default RegisterForm;