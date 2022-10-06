import React from 'react';
import PropTypes from 'prop-types';

const TopPostsList = ({ topPeriod }) => {
    return (
        <div>{topPeriod}</div>
    );
};

TopPostsList.propTypes = {
    topPeriod: PropTypes.string.isRequired,
};

export default TopPostsList;