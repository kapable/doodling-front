import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Layout, Collapse, Tabs } from 'antd';

const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const AppLayout = ({ children }) => {
    const myInfo  = false;
    
    return (
        <Layout className='applayout'>
            <Header className='applayout-header'>
                {/* Top Nav-bar */}
                <Link href='/'><a><img className='applayout-header-main-logo' src={'https://d3edqqquyf396f.cloudfront.net/basic/doodling-logo.png'} alt='두들링' /></a></Link>
                <div className='applayout-nav'>
                    {myInfo
                    ? (
                        <>
                            <div className='applayout-nav-signup-div'><Link href={`/profile/`}><a className='applayout-nav-signup-div-a'>내 정보</a></Link></div> {/* 50 | myInfo.id */}
                            <div className='applayout-nav-login-div'><a className='applayout-nav-login-div-a'>로그아웃</a></div>
                        </>
                    )
                    : (
                        <>
                            <div className='applayout-nav-signup-div'><Link href='/register'><a className='applayout-nav-signup-div-a'>회원가입</a></Link></div>
                            <div className='applayout-nav-login-div'><Link href='/login'><a className='applayout-nav-login-div-a'>로그인</a></Link></div>
                        </>
                    )
                }
                </div>
            </Header>
            <Content>
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