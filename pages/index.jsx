import React, { Fragment } from 'react';
import Head from 'next/head';
import { Tabs } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const Home = () => {
    const categories = [{ '홈': [] }, { 'MBTI' : ['전체', '연애&썸', '끄적끄적'] }, { 'TOP100' : ["실시간", "주간", "월간"] }, { '이슈두들링' : "전체" }, { "공지" : ["전체", "필독사항", "긴급공지", "이벤트"] } ];

    return (
        <Fragment>
            <Head>
                <title>두들링 - Doodling</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            {/* Main Categories Bar */}
            <Tabs 
                className='home-category-tab'
                items={categories.map(cat => (
                    {
                        label: Object.keys(cat)[0],
                        key: Object.keys(cat)[0],
                        children: Object.values(cat)[0]
                    }
                ))}
                tabPosition='top' size='default' type='line'
                tabBarGutter={20}
                tabBarStyle={{backgroundColor: '#f3f3f3', height:'1.7rem'}}
                moreIcon={<EllipsisOutlined />} />
                {/* Sub Categories Bar */}
        </Fragment>
    );
};

export default Home;