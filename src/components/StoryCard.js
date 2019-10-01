import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function convertUnixTimeToDateTimeString(unixTime) {
  const time = new Date(unixTime * 1000).toUTCString();
  return time;
}

export default function StoryCard({
  by, time, title, url, id, kids,
}) {
  const dateTime = convertUnixTimeToDateTimeString(time);
  // If there is no URL - this is a askHN story and should link to /post route
  const checkedUrl = url || `/post?id=${id}`;
  return (
    <React.Fragment>
      <div>
        <h3>
          <a href={checkedUrl}>{title}</a>
        </h3>
      </div>
      <div>
        <h4>
          {' by '}
          <Link to={{
            pathname: '/user',
            search: `?id=${by}`,
          }}
          >
            {by}
          </Link>
          {' on '}
          {dateTime}
          {' with '}
          <Link to={{
            pathname: '/post',
            search: `?id=${id}`,
          }}
          >
            {kids.length}
          </Link>
          {' comments'}
        </h4>
      </div>
    </React.Fragment>
  );
}

StoryCard.propTypes = {
  by: PropTypes.string.isRequired,
  kids: PropTypes.arrayOf(PropTypes.number).isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
