import React from 'react';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => {
    return (
        <div>{console.log(comments)}</div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;