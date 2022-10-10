import React from 'react';
import PropTypes from 'prop-types';

const PostTitleCard = ({ contents }) => {
    const { title, createdAt, views, PostLikers, User } = contents;
    return (
        <div>
            {title}
        </div>
    );
};

PostTitleCard.propTypes = {
    contents: PropTypes.object.isRequired,
};

export default PostTitleCard;