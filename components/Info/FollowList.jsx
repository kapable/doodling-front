import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { withRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../../reducers/user';

const FollowList = ({ type, userNickname }) => {
    const { hasMoreUsers, followerList, followingList, loadFollowersLoading, loadFollowingsLoading } = useSelector((state) => state.user);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreUsers && (!loadFollowersLoading || !loadFollowingsLoading)) {
                    if(type === "follower") {
                        const lastId = followerList[followerList.length - 1]?.id;
                        dispatch({
                            type: LOAD_FOLLOWERS_REQUEST,
                            data: { userNickname, lastId },
                        });
                    } else if(type === 'following') {
                        const lastId = followingList[followingList.length - 1]?.id;
                        dispatch({
                            type: LOAD_FOLLOWINGS_REQUEST,
                            data: { userNickname, lastId },
                        });
                    }
                }
            }};
            window.addEventListener('scroll', onScroll);
            return () => {
                window.removeEventListener('scroll', onScroll);
            };
    }, [hasMoreUsers, loadFollowersLoading, loadFollowingsLoading, type, userNickname]);

    return (
        <Fragment>
            <List
                className='follow-list-form'
                loading={loadFollowersLoading || loadFollowingsLoading}
                itemLayout="horizontal"
                dataSource={type === "follower" ? followerList : followingList}
                renderItem={(item) => (
                    <List.Item>
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
    type: PropTypes.string,
    userNickname: PropTypes.string.isRequired,
};

export default withRouter(FollowList);