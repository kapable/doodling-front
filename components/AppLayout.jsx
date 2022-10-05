import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter, asPath } from 'next/router'
import PropTypes from 'prop-types';
import { Layout, Collapse, Tabs } from 'antd';
import NavigationBar from './NavigationBar';


const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

const AppLayout = ({ children }) => {
    const myInfo  = true;
    const router = useRouter();
    const noNavPages = ['info', 'upload', 'register', 'login', 'edit'];
    
    return (
        <Layout className='applayout'>
            <Header className='applayout-header'>
                {/* Top Nav-bar */}
                <Link href='/'><a><img className='applayout-header-main-logo' src={'https://d3edqqquyf396f.cloudfront.net/basic/doodling-logo.png'} alt='두들링' /></a></Link>
                <div className='applayout-nav'>
                    {myInfo
                        ? (
                            <Fragment>
                                <div className='applayout-nav-right-div'><Link href={`/info/1`}><a className='applayout-nav-right-div-a'>내 정보</a></Link></div>
                                <div className='applayout-nav-left-div'><Link href='/upload'><a className='applayout-nav-left-div-a'>글쓰기</a></Link></div>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <div className='applayout-nav-right-div'><Link href='/login'><a className='applayout-nav-right-div-a'>로그인</a></Link></div>
                                <div className='applayout-nav-left-div'><Link href='/register'><a className='applayout-nav-left-div-a'>회원가입</a></Link></div>
                            </Fragment>
                        )
                        }
                </div>
            </Header>
            <Content style={{ backgroundColor: 'white'}}>
                {/* {router.asPath.split('/').some(p => noNavPages.includes(p)) ? null : <NavigationBar />} */}
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