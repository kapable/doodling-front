import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import * as gtag from '../lib/gtag';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {

    const { myInfo } = useSelector((state) => state.user);
    
    return (
        <Layout className='applayout'>
            <Header className='applayout-header'>
                {/* Top Nav-bar */}
                <Link href='/'><a><img src={'https://images.doodling.kr/basic/doodling-logo.png'} alt='두들링' /></a></Link>
                <div className='applayout-nav'>
                    {myInfo?.id
                        ? (
                            <Fragment>
                                <div onClick={() => {gtag.event({ action: "Go to MyInfo Button", category: "Paging", label: "head bar" })}} className='applayout-nav-right-div'><Link href={`/info/${myInfo?.nickname}`}><a className='applayout-nav-right-div-a'>내 정보</a></Link></div>
                                <div onClick={() => {gtag.event({ action: "Go to Write Button", category: "Paging", label: "head bar" })}} className='applayout-nav-left-div'><Link href='/upload'><a className='applayout-nav-left-div-a'>글쓰기</a></Link></div>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <div onClick={() => {gtag.event({ action: "Go to Login Button", category: "Paging", label: "head bar" })}} className='applayout-nav-right-div'><Link href='/login'><a className='applayout-nav-right-div-a'>로그인</a></Link></div>
                                <div onClick={() => {gtag.event({ action: "Go to Register Button", category: "Paging", label: "head bar" })}} className='applayout-nav-left-div'><Link href='/register'><a className='applayout-nav-left-div-a'>회원가입</a></Link></div>
                            </Fragment>
                        )
                        }
                </div>
            </Header>
            <Content className='applayout-content'>
                {children}
            </Content>
            <Footer className='applayout-footer'>
                광고 및 후원 문의<br></br>
                Advertising and Sponsorship Contact<br></br>
                soumy21@naver.com<br></br>
                <br></br>
                Also service..<br></br>
                <a href='https://ktestone.com/' target="_blank" rel='noreferrer noopener'>🔗 케이테스트</a><br></br>
                <a href='https://niair.xyz/' target="_blank" rel='noreferrer noopener'>🔗 케이퍼니</a><br></br>
                <a href='https://jellinggame.com/' target="_blank" rel='noreferrer noopener'>🔗 젤링게임즈</a><br></br>
                <br></br>
                <Link href={`/policy/privacy`}><a>개인정보처리방침</a></Link>&nbsp;|&nbsp;
                <Link href={`/policy/terms`}><a>이용약관</a></Link>&nbsp;|&nbsp;
                <Link href={`/policy/youthProtection`}><a>청소년보호정책</a></Link>
                <br></br>
                Disclaimer:<br></br>
                All content is provided for fun and entertainment purposes only<br></br>
                ©주식회사 쿠키로켓 All Rights Reserved. 2022.
            </Footer>
        </Layout>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;