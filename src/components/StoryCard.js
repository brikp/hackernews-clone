import React from 'react';
import PropTypes from 'prop-types';

export default function StoryCard({
  by, descendants, time, title, url, id,
}) {
  return (
    <React.Fragment>
      <div>
        <h3>
          <a href={url}>{title}</a>
        </h3>
      </div>
      <div>
        <h4>
          {' by '}
          {/* TODO: Add route to User page */}
          <a href={`/user?id=${by}`}>{by}</a>
          {' on '}
          {time}
          {' with '}
          <a href={`/post?id=${id}`}>{descendants}</a>
          {' comments'}
        </h4>
      </div>
    </React.Fragment>
  );
}

StoryCard.propTypes = {
  by: PropTypes.string.isRequired,
  descendants: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
