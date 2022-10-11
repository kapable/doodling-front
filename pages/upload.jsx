import Head from 'next/head';
import React, { Fragment } from 'react';
import UploadEditor from '../components/UploadEditor';

const Upload = () => {
    return (
        <Fragment>
            <Head>
                <title>글 업로드 - 두들링</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            <UploadEditor isNewContents={true} />
        </Fragment>
    );
};

export default Upload;