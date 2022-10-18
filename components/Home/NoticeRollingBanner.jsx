import { Row } from 'antd';
import Link from 'next/link';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useSelector } from 'react-redux';

const NoticeRollingBanner = () => {
    const { categoryNew15Posts } = useSelector((state) => state.posts);

    return (
        <Row className='home-notice-rolling-banner'>
            <button>공지사항</button>
            <AliceCarousel
                autoPlay
                autoPlayControls={false}
                autoPlayStrategy="none"
                autoPlayInterval={4000}
                animationDuration={500}
                animationType="fadeout"
                infinite
                innerWidth={8}
                touchTracking={false}
                disableDotsControls={true}
                disableButtonsControls={true}
                items={
                    categoryNew15Posts
                    ? (categoryNew15Posts.map((post) => (
                        <Link href={`notice/${post?.SubCategory?.domain}/${post.id}`}><a>
                            <p>{post.title}</p>
                        </a></Link>
                    )))
                    : (<p>현재 공지글이 존재하지 않습니다.</p>)
                }
            />
        </Row>
    );
};

export default NoticeRollingBanner;