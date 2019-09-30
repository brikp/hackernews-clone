import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from './StoryCard';

function convertUnixTimeToDateTimeString(unixTime) {
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
        const dateTime = convertUnixTimeToDateTimeString(time);

        // If there is no URL - this is a askHN story and should link to /post route
        const checkedUrl = url || `/post?id=${id}`;
        if (type !== 'story') return null;
        return (
          <li key={id}>
            <StoryCard
              by={by}
              descendants={descendants}
              title={title}
              time={dateTime}
              url={checkedUrl}
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
