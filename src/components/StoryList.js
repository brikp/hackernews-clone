import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from './StoryCard';

export default function StoryList({ stories }) {
  return (
    <ul>
      {stories.map((story) => {
        const {
          by, kids, id, time, title, url, type,
        } = story;

        if (type !== 'story') return null;
        return (
          <li key={id}>
            <StoryCard
              by={by}
              kids={kids || []}
              title={title}
              time={time}
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
