import { Col, Row } from 'antd';
import React from 'react';
import {
    IssueIcon,
    MBTIIcon,
    NoticeIcon,
    Top100Icon
} from '../../public';
import PropTypes from 'prop-types';

const TItleInfoCard = ({ category, subTheme }) => {
    const iconObject = { 'issue': IssueIcon, 'mbti': MBTIIcon, 'notice': NoticeIcon, 'top100': Top100Icon };

    return (
        <div className='category-main-title-info-div'>
            <Row align='middle'>
                <Col span={14}>
                    {iconObject[category?.domain]
                    ? <img className='category-each-category-icon-img' src={iconObject[category?.domain].src} alt={category?.domain} />
                    : null}
                    <span className='category-each-category-span'>{category?.label}</span>
                </Col>
                <Col span={10}>
                    {subTheme
                    ? <span className='category-each-subcategory-span'>{category?.label} / {category.SubCategories.find((sub) => sub.domain === subTheme).label}</span>
                    : null}
                </Col>
            </Row>
        </div>
    );
};

TItleInfoCard.propTypes = {
    category: PropTypes.object.isRequired,
    subTheme: PropTypes.string.isRequired,
};

export default TItleInfoCard;