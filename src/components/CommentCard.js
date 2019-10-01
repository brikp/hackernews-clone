import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function convertUnixTimeToDateTimeString(unixTime) {
  const time = new Date(unixTime * 1000).toUTCString();
  return time;
}

function createMarkup(text) {
  return { __html: text };
}

export default function PostCard({ by, time, text }) {
  const dateTime = convertUnixTimeToDateTimeString(time);
  return (
    <React.Fragment>
      <h4>
        {'by '}
        <Link to={{
          pathname: '/user',
          search: `?id=${by}`,
        }}
        >
          {by}
        </Link>
        {` on ${dateTime}`}
      </h4>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={createMarkup(text)} />
    </React.Fragment>
  );
}


PostCard.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
