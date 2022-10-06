import { Button } from 'antd';
import React, { Fragment, useCallback } from 'react';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const BasicInfoCard = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { myInfo } = useSelector((state) => state.user);

    const onClickLogoutButton = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
        alert('안전하게 로그아웃 되었습니다!');
        return router.replace('/');
    }, [LOG_OUT_REQUEST]);

    return (
        <Fragment>
            {myInfo?.id ? <Button onClick={onClickLogoutButton}>로그아웃</Button> : null}
        </Fragment>
    );
};

export default BasicInfoCard;