import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import Head from 'next/head';
import Router from 'next/router';
import CreateMainCategory from '../../components/Admin/Category/CreateMainCategory';
import CreateSubCategory from '../../components/Admin/Category/CreateSubCategory';
import SetCategoryList from '../../components/Admin/Category/SetCategoryList';
import { useEffect } from 'react';
import { LOAD_CATEGORIES_REQUEST } from '../../reducers/category';
import axios from 'axios';

const Category = () => {
    const dispatch = useDispatch();
    const { categories, addCategoryLoading, addCategoryDone, addCategoryError } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        });
    }, []);

    // useEffect(() => {
    //     if(!userInfo?.admin) {
    //         alert('관리자 로그인이 필요합니다!');
    //         Router.replace('/login');
    //     }
    // }, [userInfo]);

    // useEffect(() => {
    //     if(setCategoryDone) {
    //         alert('설정이 변경되었습니다!');
    //     };
    //     if(setCategoryError) {
    //         alert('설정 변경에 실패했습니다 ㅠㅠ');
    //     };
    // }, [setCategoryDone, setCategoryError]);

    const onCheckChange = (v, checked) => {
        // dispatch({
        //     type: SET_CATEGORY_REQUEST,
        //     data: { v, checked },
        // })
    }

    return (
        <div className='admin-category-main-div'>
            <Head>
                <title>카테고리 편집 | 두들링</title>
                <link rel='shortcut icon' href='/doodling-favicon.png'/>
                <meta charSet='utf-8'/>
                <meta name="language" content="Korean" />
                <meta name="author" content="쿠키로켓" />
                <meta name="description" content="두들링 - MBTI 기반 커뮤니티" />
                <meta name="keywords" content="MBTI, 커뮤니티" />
            </Head>
            {/* Sorting and Enabling */}
            <SetCategoryList categories={categories}/>

            {/* Creating Main Category */}
            <CreateMainCategory />

            {/* Creating Sub Category */}
            <CreateSubCategory categories={categories} />
        </div>
    );
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
    store.dispatch(END);

    await store.sagaTask.toPromise();
});

export default Category;