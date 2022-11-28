import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as gtag from '../lib/gtag';

const NavigationBar = ({ categoryDomain, subCategoryDomain }) => {
    const router = useRouter();
    const { categories } = useSelector((state) => state.category);

    const [currentCategoryDomain, setCurrentCategoryDomain] = useState(categoryDomain);
    const [currentSubCategoryDomain, setCurrentSubCategoryDomain] = useState(subCategoryDomain);

    const onChangeCategory = useCallback((categoryDomain) => {
        setCurrentCategoryDomain(categoryDomain);
        setCurrentSubCategoryDomain(null);
    }, []);

    const onChangeSubCategory = useCallback((subCategoryDomain) => {
        setCurrentSubCategoryDomain(subCategoryDomain);
    }, []);

    const onCategoryTabClick = useCallback((domain) => {
        gtag.event({ action: "Tab NavBar", category: "Navigating", label: "main page" });
        if(domain === 'top100') { // TOP100
            return router.push('/top100');
        } else if (domain === 'notice') { // NOTICE
            return router.push('/notice');
        } else if (domain === '') { // HOME
            return router.push('/');
        } else {
            return router.push(`/${domain}`);
        };
    }, []);

    const onSubCategoryTabClick = useCallback((domain) => {
        gtag.event({ action: "Tab SubNavBar", category: "Navigating", label: "main page" });
        return router.push(`/${currentCategoryDomain}/${domain}`);
    }, [currentCategoryDomain]);

    useEffect(() => {
        setCurrentCategoryDomain(categoryDomain);
        setCurrentSubCategoryDomain(subCategoryDomain);
    }, [categoryDomain, subCategoryDomain]);

    return (
        <Fragment>
            {/* Categories Nav-Bar */}
            <Tabs 
                className='home-category-tab'
                onChange={onChangeCategory}
                items={categories.map(cat => {
                    return {
                        label: cat['label'],
                        key: cat['domain'],
                        children: cat['SubCategories'].length > 0
                        ? <Tabs items={cat['SubCategories'].map(subCat => (
                                { 
                                    label: subCat['label'],
                                    key: subCat['domain'],
                                    children: null
                                }
                            ))}
                            activeKey={currentSubCategoryDomain}
                            onTabClick={onSubCategoryTabClick}
                            className='home-subcategory-tab' tabPosition='top' size='default' type='line'
                            onChange={onChangeSubCategory}
                            animated={false}
                            tabBarGutter={20} tabBarStyle={{backgroundColor: '#f7f7f7', height:'2.7rem'}} moreIcon={<EllipsisOutlined />} />
                        : null
                    }
                })}
                activeKey={currentCategoryDomain}
                onTabClick={onCategoryTabClick}
                tabPosition='top' size='large' type='line'
                tabBarGutter={20}
                tabBarStyle={{backgroundColor: 'white', height:'2.7rem', fontWeight: 'bold'}}
                moreIcon={<EllipsisOutlined />}
                animated={false} />
        </Fragment>
    );
};

NavigationBar.propTypes = {
    categoryDomain: PropTypes.string,
    subCategoryDomain: PropTypes.string,
};

export default NavigationBar;