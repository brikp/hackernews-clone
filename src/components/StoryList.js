import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from './StoryCard';

function convertUnixToDateTimeString(unixTime) {
  const time = new Date(unixTime * 1000).toUTCString();
  return time;
}

export default function StoryList({ stories }) {
  return (
    <ul>
      {stories.map((story) => {
        const {
          by, descendants, id, time, title, url, type,
        } = story;
        const dateTime = convertUnixToDateTimeString(time);
        if (type !== 'story') return null;
        return (
          <li key={id}>
            <StoryCard
              by={by}
              descendants={descendants}
              title={title}
              time={dateTime}
              url={url}
              id={id}
            />
          </li>
        );
      })}
    </ul>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
