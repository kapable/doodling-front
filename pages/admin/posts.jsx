import { CheckCircleFilled, LeftOutlined, LinkOutlined, MinusCircleFilled } from '@ant-design/icons';
import { Table, Space, Col, Row } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Router } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import dayjs from 'dayjs';
import { LOAD_ALL_POSTS_REQUEST } from '../../reducers/posts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { REMOVE_POST_REQUEST, REVIVE_POST_REQUEST } from '../../reducers/post';

const { Column, ColumnGroup } = Table;

const Posts = () => {
    const dispatch = useDispatch();
    const { myInfo } = useSelector((state) => state.user);
    const { allPosts, hasMorePosts } = useSelector((state) => state.posts);
    
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
            dispatch({
                type: REMOVE_POST_REQUEST,
                data: { postId: id },
            });
        };
    }, []);

    const onRevivePost = useCallback((id) => {
        if (confirm("정말로 복구하시겠습니까?\n복구된 게시물은 바로 서비스에 노출됩니다.") === true) {
            dispatch({
                type: REVIVE_POST_REQUEST,
                data: { postId: id },
            });
        };
    }, []);

    const onPageChange = useCallback((pageInfo) => {
        if(hasMorePosts && pageInfo.current % 100 === 0) {
            const lastId = allPosts[allPosts.length - 1]?.id;
            dispatch({
                type: LOAD_ALL_POSTS_REQUEST,
                data: { lastId }
            });
        };
    }, [hasMorePosts]);

    if(myInfo?.admin) {
        return (
            <div>
                <Head>
                    <title>포스트 관리 | 두들링</title>
                    <link rel='main-url' href='https://doodling.kr/admin/posts' />
                    <link rel='shortcut icon' href='/doodling-favicon.png'/>
                    <meta charSet='utf-8'/>
                    <meta name="language" content="Korean" />
                    <meta name="author" content="쿠키로켓" />
                    <meta name="description" content="포스트 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta name="keywords" content="MBTI, 커뮤니티" />

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content='https://doodling.kr/admin/posts' />
                    <meta property="og:title" content='포스트 관리 | 두들링'/>
                    <meta property="og:description" content="포스트 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="og:image" content="/doodling-favicon.png"/>
                    <meta property="og:image:width" content="800"/>
                    <meta property="og:image:height" content="400"/>
                    <meta property="og:image:alt" content="포스트 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='포스트 관리 | 두들링' />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content='https://doodling.kr/admin/posts'/>
                    <meta property="twitter:title" content='포스트 관리 | 두들링'/>
                    <meta property="twitter:description" content="포스트 관리 | 두들링 - MBTI 기반 커뮤니티"/>
                    <meta property="twitter:image" content="/doodling-favicon.png"/>
                    <meta property="twitter:image:width" content="800"/>
                    <meta property="twitter:image:height" content="400"/>
                    <meta property="twitter:image:alt" content="포스트 관리 | 두들링 - MBTI 기반 커뮤니티" />
                    <meta property='og:site_name' content='포스트 관리 | 두들링' />
                </Head>
                {/* go to admin main page */}
                <Row className='profile-follow-back-to-profile-row'>
                    <Col span={24}>
                        <Link href={`/admin`}><a><LeftOutlined /> 어드민 메인 페이지</a></Link>
                    </Col>
                </Row>
                <Table onChange={onPageChange} pagination={{ hideOnSinglePage: true }} dataSource={allPosts} key="table" rowKey={post => post.id} className='admin-posts-table'>
                    <Column title="No." dataIndex="id" key="post-id" />
                    <Column title='상태' dataIndex='enabled' render={(enabled) => (
                        enabled
                        ? (<Space size='middle'><CheckCircleFilled style={{ color: '#3EB94F' }} /></Space>)
                        : (<Space size='middle'><MinusCircleFilled style={{ color: '#F85149' }} /></Space>)
                    )} />
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
                            render={(_, post) => (
                                post.enabled
                                ? (
                                    <Space size="middle">
                                        <a onClick={() => onRemovePost(post.id)}>삭제</a>
                                    </Space>
                                )
                                : (
                                    <Space size="middle">
                                        <a onClick={() => onRevivePost(post.id)}>복구</a>
                                    </Space>
                                )
                                
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
        type: LOAD_ALL_POSTS_REQUEST,
        data: { lastId: null }
    });
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Posts;