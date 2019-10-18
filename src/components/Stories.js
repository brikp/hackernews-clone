import React from 'react';
import PropTypes from 'prop-types';
import { fetchTopStoriesData, fetchNewStoriesData } from '../utils/api';
import Loading from './Loading';
import StoryList from './StoryList';

function Stories({ location }) {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchStories = (fetchFunction) => {
    fetchFunction(50)
      .then((data) => {
        setStories(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(`There was an error fetching data, ${e}`);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    const fn = (location.pathname === '/') ? fetchTopStoriesData : fetchNewStoriesData;
    fetchStories(fn);

    return () => {
      setStories([]);
      setIsLoading(true);
    };
  }, [location.pathname]);

  const path = (location.pathname === '/') ? 'top' : 'new';
  return (
    <React.Fragment>
      {isLoading && <Loading text={`Fetching ${path} stories`} />}

      {error && <p>{error}</p>}

      {stories && <StoryList stories={stories} />}
    </React.Fragment>
  );
}

Stories.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default Stories;
