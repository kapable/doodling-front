import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import useInput from '../../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CATEGORY_REQUEST } from '../../../reducers/category';

const CreateMainCategory = () => {
    const dispatch = useDispatch();
    const { addCategoryLoading, addCategoryDone, addCategoryError } = useSelector((state) => state.category);

    const [newCategory, handleNewCategory, setNewCategory] = useInput('');
    const [newCategoryDomain, setNewCategoryDomain] = useState('');

    const onInputSubmit = useCallback(() => {
        if(newCategory === '') {
            return alert('카테고리를 입력해주세요');
        }
        dispatch({
            type: ADD_CATEGORY_REQUEST,
            data: { label : newCategory, domain: newCategoryDomain },
        })
        setNewCategory('');
        setNewCategoryDomain('');

        if(addCategoryDone) {
            return alert('새로운 카테고리가 추가되었습니다!');
        } else if (addCategoryError) {
            return alert(addCategoryError);
        };
    }, [newCategory, newCategoryDomain, addCategoryDone, addCategoryError]);

    const onCategoryDomain = useCallback((e) => {
        setNewCategoryDomain(e.target.value.replace(/[^A-Za-z0-9]/ig, ''))
    }, []);

    return (
        <Fragment>
            <h1>메인 카테고리 생성</h1>
            <Input
                type="text"
                size="big"
                value={newCategory}
                onChange={handleNewCategory}
                placeholder="보여질 카테고리 입력 후 Enter"
                className="create-category-input"
            />
            <Input
                type="text"
                size="big"
                value={newCategoryDomain}
                onChange={onCategoryDomain}
                placeholder="카테고리 페이지 domain 영어로 입력 후 Enter"
                pattern='[A-Za-z0-9]'
                className="create-category-input"
            />
            <Button onClick={onInputSubmit} type='primary' disabled={!(newCategory && newCategoryDomain)} loading={addCategoryLoading}>메인 카테고리 생성</Button>
        </Fragment>
    );
};

export default CreateMainCategory;