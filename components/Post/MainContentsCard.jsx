import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post';
import { Button } from 'antd';
import { LikeFilled, LinkOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MainContentsCard = ({ contents, categoryDomain, subCategoryDomain }) => {
    const dispatch = useDispatch();
    const { myInfo, userInfo } = useSelector((state) => state.user);
    const [likeClick, setLikeClick] = useState(false);

    useEffect(() => {
        // if the loaded user(user own)'s PostLiked list has the current post id
        userInfo?.id && userInfo.PostLiked.length > 0 && userInfo.PostLiked.find((p) => p.id === contents.id)
        ? setLikeClick(true)
        : setLikeClick(false)
    }, [userInfo, contents]);

    const onLikeClick = useCallback(() => {
        if(!myInfo?.id) {
            return alert('좋아요를 누르려면 로그인이 필요합니다!');
        };
        dispatch({
            type: LIKE_POST_REQUEST,
            data: { postId : contents.id }
        });
    }, [contents, myInfo]);

    const onUnLikeClick = useCallback(() => {
        if(!myInfo?.id) {
            return alert('로그인이 필요합니다!');
        };
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: { postId : contents.id }
        });
    }, [contents, myInfo]);

    const onShareButtonClick = useCallback(() => {
        alert('링크가 복사되었습니다!');
    }, []);

    return (
        <Fragment>
            <div className='post-contents-div' dangerouslySetInnerHTML={{ __html: contents.text }}></div>
            <div className='post-contents-bottom-div'>
                {likeClick
                ? <Button className='post-contents-bottom-liked' shape='round' type='primary' onClick={onUnLikeClick}><LikeFilled /> {contents.PostLikers}</Button>
                : <Button className='post-contents-bottom-unliked' shape='round' onClick={onLikeClick}><LikeFilled /> {contents.PostLikers}</Button>}
                <CopyToClipboard
                        text={myInfo?.admin ? `https://doodling.kr/${categoryDomain}/${subCategoryDomain}/${contents.id}?ref_id=${myInfo.id}` : `https://doodling.kr/${categoryDomain}/${subCategoryDomain}/${contents.id}`} // in case of 1.for Admin refferer tracking 2. ordinary user
                        onCopy={onShareButtonClick}
                    ><Button shape='round'><LinkOutlined /> 링크 복사하기</Button></CopyToClipboard>
            </div>
        </Fragment>
    );
};

MainContentsCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default MainContentsCard;