import React from 'react';
import PropTypes from 'prop-types';
import { fetchTopStoriesData, fetchNewStoriesData } from '../utils/api';
import Loading from './Loading';
import StoryList from './StoryList';

export default class Stories extends React.Component {
  state = {
    stories: [],
    error: null,
    loading: true,
  }

  componentDidMount() {
    const { location } = this.props;
    const fn = (location.pathname === '/') ? fetchTopStoriesData : fetchNewStoriesData;

    this.fetchStories(fn);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location.pathname !== location.pathname) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ stories: [], loading: true });
      const fn = (location.pathname === '/') ? fetchTopStoriesData : fetchNewStoriesData;

      this.fetchStories(fn);
    }
  }

  fetchStories = (fetchFunction) => {
    fetchFunction(50)
      .then((data) => {
        this.setState({ stories: data, loading: false });
      })
      .catch((e) => {
        this.setState({ error: `There was an error fetching data, ${e}`, loading: false });
      });
  }

  render() {
    const { stories, error, loading } = this.state;
    const { location } = this.props;
    const path = (location.pathname === '/') ? 'top' : 'new';
    return (
      <React.Fragment>
        {loading && <Loading text={`Fetching ${path} stories`} />}

        {error && <p>{error}</p>}

        {stories && <StoryList stories={stories} />}
      </React.Fragment>
    );
  }
}

Stories.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
