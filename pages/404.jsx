import Link from 'next/link';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Head from 'next/head';
export default function Custom404() {
    return (
        <div className='main-404-div'>
            <Head>
                <title>404 두들링 - Doodling</title>
                <link rel='main-url' href='https://doodling.kr/404' />
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="404 두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content='https://doodling.kr/404' />
                <meta property="og:title" content='두들링 - Doodling'/>
                <meta property="og:description" content="404 두들링 - MBTI 기반 커뮤니티"/>
                <meta property="og:image" content="/doodling-favicon.png"/>
                <meta property="og:image:width" content="800"/>
                <meta property="og:image:height" content="400"/>
                <meta property="og:image:alt" content="404 두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='두들링 - Doodling' />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content='https://doodling.kr/404'/>
                <meta property="twitter:title" content='두들링 - Doodling'/>
                <meta property="twitter:description" content="404 두들링 - MBTI 기반 커뮤니티"/>
                <meta property="twitter:image" content="/doodling-favicon.png"/>
                <meta property="twitter:image:width" content="800"/>
                <meta property="twitter:image:height" content="400"/>
                <meta property="twitter:image:alt" content="404 두들링 - MBTI 기반 커뮤니티" />
                <meta property='og:site_name' content='두들링 - Doodling' />
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