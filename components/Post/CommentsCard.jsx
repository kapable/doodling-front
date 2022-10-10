import React from 'react';
import PropTypes from 'prop-types';

const CommentsCard = ({ comments }) => {
    return (
        <div>CommentsCard</div>
    );
};

CommentsCard.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsCard;