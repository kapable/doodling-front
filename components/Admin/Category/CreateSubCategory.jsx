import { Select, Input, Button } from 'antd';
import React, { Fragment, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import PropTypes from 'prop-types';
import { ADD_SUBCATEGORY_REQUEST } from '../../../reducers/category';

const { Option } = Select;

const CreateSubCategory = ({ categories }) => {
    const dispatch = useDispatch();
    const [newSubCategory, handleNewSubCategory, setNewSubCategory] = useInput('');
    const [newSubCategoryDomain, setNewSubCategoryDomain] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();

    const onCategoryChange = useCallback((cat) => {
        let selectedCat = categories.find((c) => c.label === cat);
        setSelectedCategory(selectedCat);
    }, []);

    const onSubCategoryDomain = useCallback((e) => {
        setNewSubCategoryDomain(e.target.value.replace(/[^A-Za-z0-9]/ig, ''))
    }, []);

    const onSubInputSubmit = useCallback(() => {
        if(newSubCategory === '') {
            return alert('서브 카테고리를 입력해주세요');
        };
        if(!newSubCategoryDomain) {
            return alert('서브 카테고리 도메인을 입력해주세요.');
        };
        let exSubCategoryLabels =  selectedCategory?.SubCategories.map((s) => s.label.replace(/[\s]/ig, ''));
        if(exSubCategoryLabels.includes(newSubCategory)) {
            return alert('이미 존재하는 서브 카테고리입니다.');
        };

        let exSubCategoryDomains =  selectedCategory?.SubCategories.map((s) => s.domain.replace(/[\s]/ig, ''));
        if(exSubCategoryDomains.includes(newSubCategoryDomain)) {
            return alert('이미 존재하는 서브 카테고리 도메인입니다.');
        };
        dispatch({
            type: ADD_SUBCATEGORY_REQUEST,
            data: { label: newSubCategory, domain: newSubCategoryDomain, categoryId: selectedCategory.id },
        });
        setNewSubCategory('');
        setNewSubCategoryDomain('');
    }, [newSubCategory, newSubCategoryDomain, selectedCategory]);

    return (
        <Fragment>
            <h1>서브 카테고리 생성</h1>
            <Select
                className='create-subcategory-select'
                placeholder="메인 게시판을 선택해주세요."
                optionLabelProp='type'
                onChange={onCategoryChange}
                >
                {categories.map((cat) => {
                    if(cat.domain !== 'main') {
                        return <Option value={cat.label} key={cat.domain} ></Option>
                    }
                })}
            </Select>
            {selectedCategory
            ? <Fragment>
                <Input
                    type="text"
                    size="big"
                    value={newSubCategory}
                    onChange={handleNewSubCategory}
                    placeholder="서브 카테고리 입력 후 Enter"
                    className="create-category-input"
                />
                <Input
                    type="text"
                    size="big"
                    value={newSubCategoryDomain}
                    onChange={onSubCategoryDomain}
                    placeholder="카테고리 페이지 domain 영어로 입력 후 Enter"
                    pattern='[A-Za-z0-9]'
                    className="create-category-input"
                />
                </Fragment>
            : null}
            <Button onClick={onSubInputSubmit} type='primary' disabled={!(newSubCategory && newSubCategoryDomain)}>서브 카테고리 생성</Button>
        </Fragment>
    );
};

CreateSubCategory.propTypes = {
    categories: PropTypes.array.isRequired,
};

export default CreateSubCategory;