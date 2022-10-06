import Link from 'next/link';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Head from 'next/head';
export default function Custom404() {
    return (
        <div className='main-404-div'>
            <Head>
                <title>두들링 - Doodling</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <link rel="mask-icon" href="/doodling-favicon.png" />
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <h3>존재하지 않는 페이지입니다 ㅠㅠ</h3>
            <Link href={`/`}>
                <a>
                    <Button type="primary">
                        <RollbackOutlined />
                        메인으로 돌아가기
                    </Button>
                </a>
            </Link>
        </div>
    );
};