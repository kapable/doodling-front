import React, { Fragment } from 'react';
import CategoryNewPosts from './Home/CategoryNewPosts';
import NoticeRollingBanner from './Home/NoticeRollingBanner';
import TopPosts from './Home/TopPosts';

const HomeLayout = () => {
    return (
        <Fragment>
            <NoticeRollingBanner />
            <TopPosts />
            <CategoryNewPosts />
        </Fragment>
    );
};

export default HomeLayout;