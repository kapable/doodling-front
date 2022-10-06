import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import { withRouter } from 'next/router';

const FollowList = ({ userList, type }) => {

    return (
        <Fragment>
            <div>{type === "follower" ? '팔로워' : '팔로잉'}</div>
            <List
                className='follow-list-form'
                itemLayout="horizontal"
                dataSource={userList}
                renderItem={(item) => (
                    <List.Item actions={[<Button>팔로우</Button>]}>
                        <List.Item.Meta
                            title={<p>{item.nickname} <span className='follow-list-user-type'>{item.mbti}</span></p>}
                        />
                    </List.Item>
                )}
            />
        </Fragment>
    );
};

FollowList.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.shape({
        userId: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
        mbti: PropTypes.string.isRequired,
    })).isRequired,
    type: PropTypes.string.isRequired,
};

export default withRouter(FollowList);