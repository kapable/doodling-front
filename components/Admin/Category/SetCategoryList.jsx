import { Tree } from 'antd';
import React, { Fragment, useCallback, useState } from 'react';
import { SET_CATEGORY_ENABLE_REQUEST, SET_SUBCATEGORY_ENABLE_REQUEST } from '../../../reducers/category';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const SetCategoryList = ({ categories }) => {
    const dispatch = useDispatch();
    const { setCategoryEnableLoading, setCategoryEnableDone, setCategoryEnableError, setSubCategoryEnableLoading, setSubCategoryEnableDone, setSubCategoryEnableError } = useSelector((state) => state.category);

    const [gData, setGData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const onDrop = useCallback((info) => {
        const dropKey = info.node.key;
        const dragKey = info.dragNode.key;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                    if (data[i].key === key) {
                        return callback(data[i], i, data);
                    }
                    if (data[i].children) {
                        loop(data[i].children, key, callback);
                    }
                }
            };

        const data = [...gData]; // Find dragObject

        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item) => {
                item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

                item.children.unshift(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item) => {
              item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

              item.children.unshift(dragObj); // in previous version, we use item.children.push(dragObj) to insert the
              // item to the tail of the children
            });
        } else {
            let ar = [];
            let i;
            loop(data, dropKey, (_item, index, arr) => {
                ar = arr;
                i = index;
            });

            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        console.log(data);
        setGData(data);
    }, []);

    const onCheck = useCallback((checkedKeysValue, e) => {
        // in case of Main Category Enabling Check
        if(e.node?.children) {
            let selectedCategory = categories.find((cat) => cat.domain === e.node.key);
            dispatch({
                type: SET_CATEGORY_ENABLE_REQUEST,
                data: { categoryId : selectedCategory.id, checked : !e.node.checked }
            });
        // in case of Sub Category Enabling Check
        } else {
            const subPosition = e.node.pos.split('-');
            const selectedCat = gData[subPosition[1]];
            const selectedSubCat = selectedCat.children[subPosition[2]];
            const selectedSubCatKey = selectedSubCat.key.includes('index') ? "" : selectedSubCat.key;
            let selectedCategory = categories.find((cat) => cat.domain === selectedCat.key);
            let selectedSubCategory = selectedCategory.SubCategories.find((sub) => sub.domain === selectedSubCatKey);
            dispatch({
                type: SET_SUBCATEGORY_ENABLE_REQUEST,
                data: { subCategoryId: selectedSubCategory.id, checked : !e.node.checked }
            });
        }
        setCheckedKeys(checkedKeysValue);
    }, [categories, gData]);

    // setting for Tree Structure
    useEffect(() => {
        const treeData = categories.map((c) => {
            let treeKey = c.label.includes('홈') || c.label.includes('전체') || c.label.includes('실시간') ? c.domain + '-index' : c.domain;
            if(c.SubCategories.length === 0) {
                
                return {
                    title: c.label,
                    key: treeKey
                }
            } else {
                if(c.enabled === true || c.enaled === 'true') {
                    
                }
                return {
                    title: c.label,
                    key: c.domain,
                    children: c.SubCategories.map((s) => {
                        let treeKeySub = s.label.includes('홈') || s.label.includes('전체') || s.label.includes('실시간') ? c.domain + '-index' : s.domain;
                        
                        return {
                            title: s.label,
                            key: treeKeySub
                        }
                    })
                }
            };
        });
        setGData(treeData);
    }, [categories]);

    // setting for Checked Tree Nodes
    useEffect(() => {
        let checkedCats = [];
        categories.map((c) => {
            if(c.enabled) {
                if(c?.SubCategories.length > 0) {
                    c.SubCategories.map((s) => {
                        let treeKeySub = s.label.includes('홈') || s.label.includes('전체') || s.label.includes('실시간') ? c.domain + '-index' : s.domain;
                        if(s.enabled) {
                            checkedCats.push(treeKeySub)
                        }
                    })  
                }
            }
        });
        console.log(categories, checkedCats);
        setCheckedKeys(checkedCats);
    }, [categories])

    useEffect(() => {
        if(setCategoryEnableError || setSubCategoryEnableError) {
            return alert('카테고리 세팅 중 에러가 발생했습니다.');
        };
    }, [setCategoryEnableError, setSubCategoryEnableError]);

    useEffect(() => {
        if(setCategoryEnableDone || setSubCategoryEnableDone) {
            return alert('카테고리 세팅이 성공적으로 반영되었습니다.');
        }
    }, [setCategoryEnableDone, setSubCategoryEnableDone])

    return (
        <Fragment>
            <h1>두들링 카테고리 목록</h1>
            <Tree
                className="category-tree"
                // draggable
                onDrop={onDrop}
                blockNode
                showLine
                checkable
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                treeData={gData}
                disabled={setCategoryEnableLoading || setSubCategoryEnableLoading}
            />
        </Fragment>
    );
};

export default SetCategoryList;