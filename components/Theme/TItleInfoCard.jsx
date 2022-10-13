import { Row } from 'antd';
import React from 'react';

const TItleInfoCard = ({ category, subTheme }) => {
    return (
        <div className='category-main-title-info-div'>
            <Row><h1>{category?.label}
                {subTheme ? ` - ${category.SubCategories.find((sub) => sub.domain === subTheme).label}` : null}
            </h1></Row>
            <Row><span>HOT</span></Row>
        </div>
    );
};

export default TItleInfoCard;