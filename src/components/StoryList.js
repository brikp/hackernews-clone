import React from 'react';
import PropTypes from 'prop-types';
import StoryCard from './StoryCard';

export default function StoryList({ stories }) {
  return (
    <ul>
      {stories.map((story) => {
        if (!story) return null;
        const {
          by, kids, id, time, title, url, type,
        } = story;
        const checkedUrl = url || `/post?id=${id}`;

        if (type !== 'story' || story.deleted) return null;
        return (
          <li key={id}>
            <StoryCard
              by={by}
              kids={kids || []}
              title={title}
              time={time}
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
