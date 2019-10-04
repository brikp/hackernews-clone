import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';

export default function CommentList({ comments }) {
  return (
    <ul>
      {comments.length > 0 && comments.map((comment) => {
        if (!comment || comment.deleted) return null;
        const { id, by, time, text } = comment;

        return (
          <li key={id}>
            <CommentCard
              by={by}
              time={time}
              text={text}
            />
          </li>
        );
      })}
    </ul>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
