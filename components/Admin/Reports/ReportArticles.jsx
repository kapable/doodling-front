import { Button, Space, Table, Pagination } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';
import { CLEAR_REPORTED_ARTICLE_REQUEST, GET_REPORTED_ARTICLES_REQUEST, REMOVE_REPORTED_ARTICLE_REQUEST } from '../../../reducers/report';

const { Column, ColumnGroup } = Table;

const ReportArticles = () => {
    const dispatch = useDispatch();
    const { reportedArticles, getReportedArticlesLoading, hasMoreReportedArticles } = useSelector((state) => state.report);
    const onClearArticle = useCallback((id) => {
        if (confirm("정말로 정상 처리하시겠습니까?\n해당 게시물의 모든 신고건이 사라집니다.") === true) {
            dispatch({
                type: CLEAR_REPORTED_ARTICLE_REQUEST,
                data: id,
            });
        };
    }, []);
    const onRemoveArticle = useCallback((id) => {
        if (confirm("정말로 삭제하시겠습니까?\n삭제된 게시물은 복구가 불가능합니다.") === true) {
            dispatch({
                type: REMOVE_REPORTED_ARTICLE_REQUEST,
                data: id,
            });
        };
    }, []);

    useEffect(() => {
        function onScroll() {
            if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500) {
                if(hasMoreReportedArticles && !getReportedArticlesLoading) {
                    const lastId = reportedArticles[reportedArticles.length - 1]?.id;
                    dispatch({
                        type: GET_REPORTED_ARTICLES_REQUEST,
                        data: { lastId }
                    });
                };
            };
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMoreReportedArticles, getReportedArticlesLoading, reportedArticles]);

    return (
        <div>
            <Table title={() => <strong>*아래로 스크롤하면 더 많은 신고 항목을 볼 수 있습니다.</strong>} pagination={false} style={{ margin: "0 1.5rem"}} dataSource={reportedArticles || []} rowKey={post => post.id} loading={getReportedArticlesLoading} >
                <Column title="No." dataIndex="id" key="post-id" />
                <Column title='게시글' key='article' render={(_, post) => (
                    <Link href={`/${post.Post.SubCategory.Category.domain}/${post.Post.SubCategory.domain}/${post.Post.id}`} key={`${post.User.nickname}-${post.createdAt}-article`}><a>{`${post.Post.title.slice(0, 10)}...`}</a></Link>
                )} />
                <Column title="신고 이유" key='label' render={(_, post) => (
                    <Space key={`${post.User.nickname}-${post.createdAt}-label`}>{post.ReportLabel.label}</Space>
                )} />
                <Column title="글쓴이" key='user' render={(_, post) => (
                    <Link href={`/info/${post.User.nickname}`} key={`${post.User.nickname}-${post.createdAt}-author`}><a>{post.User.nickname}</a></Link>
                )} />
                <Column title="신고일" dataIndex="createdAt" key="createdAt" render={(date) => (<Space size='middle' >{dayjs(date).format('YYYY-MM-DD')}</Space>)} />
                <ColumnGroup title="게시물 처리">
                    <Column title="정상 처리" key="clear" dataIndex="id" render={(_, post) => (
                        <Button type="primary" onClick={() => onClearArticle(post.Post.id)}>
                            <CheckCircleOutlined /> 정상 처리
                        </Button>
                    )} />
                    <Column title="삭제" key="delete" dataIndex="id" render={(_, post) => (
                        <Button danger type="primary" onClick={() => onRemoveArticle(post.Post.id)}>
                            <DeleteOutlined /> 삭제
                        </Button>
                    )} />
                </ColumnGroup>
            </Table>
        </div>
    );
};

export default ReportArticles;