import { LeftOutlined, LinkOutlined } from '@ant-design/icons';
import { Table, Space, Col, Row } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import dayjs from 'dayjs';
import { LOAD_ALL_POSTS_REQUEST } from '../../reducers/posts';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Column, ColumnGroup } = Table;

const Posts = () => {
    const { myInfo } = useSelector((state) => state.user);
    const { allPosts } = useSelector((state) => state.posts);
    
    useEffect(() => {
        if(!myInfo?.admin) {
            alert('관리자만 접근할 수 있습니다!');
            Router.replace('/login');
        }
    }, [myInfo]);

    const onShareButtonClick = useCallback(() => {
        alert('링크가 복사되었습니다!');
    }, []);

    const onRemovePost = useCallback((id) => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 게시물은 복구가 불가능합니다.") === true) {
            // dispatch({
            //     type: REMOVE_POST_REQUEST,
            //     data: id,
            // });
        }
    }, []);

    if(myInfo?.admin) {
        return (
            <div>
                <Head>
                    <title>포스트 관리 | 두들링</title>
                    <link rel='shortcut icon' href='/doodling-favicon.png'/>
                    <meta charSet='utf-8'/>
                    <meta name="language" content="Korean" />
                    <meta name="author" content="쿠키로켓" />
                    <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                    <meta name="keywords" content="MBTI, 커뮤니티" />
                </Head>
                {/* go to admin main page */}
                <Row className='profile-follow-back-to-profile-row'>
                    <Col span={24}>
                        <Link href={`/admin`}><a><LeftOutlined /> 어드민 메인 페이지</a></Link>
                    </Col>
                </Row>
                <Table pagination={{ hideOnSinglePage: true }} dataSource={allPosts} key="table" rowKey={post => post.id} className='admin-posts-table'>
                    <Column title="No." dataIndex="id" key="post-id" />
                    <Column title="제목" dataIndex="title" key="title" />
                    <Column
                        title="링크" key="link-copy"
                        render={(_, post) => (
                            <CopyToClipboard
                                text={myInfo?.admin ? `https://doodling.kr/${post.Category.domain}/${post.SubCategory.domain}/${post.id}?ref_id=${myInfo.id}` : `https://doodling.kr/${post.Category.domain}/${post.SubCategory.domain}/${post.id}`} // in case of 1.for Admin refferer tracking 2. ordinary user
                                onCopy={onShareButtonClick}
                            ><a><LinkOutlined /></a></CopyToClipboard>
                        )}
                    />
                    <Column title="글쓴이" key="author" render={(_, post) => (
                        <Link href={`/info/${post.User.nickname}`}><a>{post.User.nickname}</a></Link>
                    )}/>
                    <ColumnGroup title="수정/삭제">
                        <Column
                            title="" key="edit"
                            dataIndex="id"
                            render={(_, post) => (
                                <Space size="middle">
                                    <Link href={`/edit/${post.id}`}><a>수정</a></Link>
                                </Space>
                            )}
                        />
                        <Column
                            title="" key="delete"
                            dataIndex="id"
                            render={(id) => (
                                <Space size="middle">
                                    <a onClick={() => onRemovePost(id)}>삭제</a>
                                </Space>
                            )}
                        />
                    </ColumnGroup>
                    <Column
                        title="작성일"
                        dataIndex="createdAt"
                        key="createdAt"
                        render={(_, post) => (
                            <Space size="middle">
                                {dayjs(post.createdAt).format('YYYY-MM-DD')}
                            </Space>
                        )}
                        />
                </Table>
            </div>
        )
    } else {
        return null;
    };
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, res, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    };
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST
    });
    store.dispatch({
        type: LOAD_ALL_POSTS_REQUEST
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Posts;