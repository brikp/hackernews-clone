import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { convertUnixTimeToDateTimeString } from '../utils/commonFunctions';
import { ThemeConsumer } from '../contexts/theme';

export default function StoryCard({
  by, time, title, url, id, kids, cssClass,
}) {
  const dateTime = convertUnixTimeToDateTimeString(time);
  return (
    <ThemeConsumer>
      {([theme]) => (
        <div className={`story-row ${cssClass}`}>
          <div className="story">
            <h3>
              <a className={`link-story-${theme}`} href={url}>{title}</a>
            </h3>
          </div>
          <div className="metainfo">
            <h4>
              {' by '}
              <Link
                className={`link-minor-${theme}`}
                to={{
                  pathname: '/user',
                  search: `?id=${by}`,
                }}
              >
                {by}
              </Link>
              {' on '}
              {dateTime}
              {' with '}
              <Link
                className={`link-minor-${theme}`}
                to={{
                  pathname: '/post',
                  search: `?id=${id}`,
                }}
              >
                {kids.length}
              </Link>
              {' comments'}
            </h4>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

StoryCard.propTypes = {
  by: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  kids: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  cssClass: PropTypes.string,
};

StoryCard.defaultProps = {
  cssClass: '',
};
