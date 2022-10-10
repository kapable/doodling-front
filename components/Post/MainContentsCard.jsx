import React from 'react';
import PropTypes from 'prop-types';

const MainContentsCard = ({ contents }) => {
    return (
        <div className='post-contents-div' dangerouslySetInnerHTML={{ __html: contents }}></div>
    );
};

MainContentsCard.propTypes = {
    contents: PropTypes.string.isRequired,
};

export default MainContentsCard;