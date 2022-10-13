import { Row } from 'antd';
import React from 'react';

const TItleInfoCard = ({ categoryDomain }) => {
    return (
        <div>
            <Row>{categoryDomain}</Row>
            <Row></Row>
        </div>
    );
};

export default TItleInfoCard;