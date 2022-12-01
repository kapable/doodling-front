import { Space, Table } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Link from 'next/link';

const { Column, ColumnGroup } = Table;

const ReportArticles = () => {
    const { reportedArticles } = useSelector((state) => state.report);

    return (
        <div>
            <Table style={{ margin: "0 1.5rem"}} dataSource={reportedArticles || []} rowKey={post => post.id} >
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
            </Table>
            {/* {console.log(reportedArticles)} */}
        </div>
    );
};

export default ReportArticles;