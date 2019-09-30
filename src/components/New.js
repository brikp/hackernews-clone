import React from 'react';
import { fetchNewStoriesData } from '../utils/api';
import Loading from './Loading';
import StoryList from './StoryList';

// TODO: Refactor Top/New components to minimize code repetition
export default class New extends React.Component {
  state = {
    stories: [],
    error: null,
    loading: true,
  }

  componentDidMount() {
    fetchNewStoriesData(50)
      .then((data) => {
        this.setState({ stories: data, loading: false });
      })
      .catch((e) => {
        console.warn('Error fetching data: ', e);
        this.setState({ error: 'There was an error fetching data', loading: false });
      });
  }

  // isLoading = () => {
  //   const { stories, error } = this.state;
  //   return !stories && error === null;
  // }

  render() {
    const { stories, error, loading } = this.state;

    return (
      <React.Fragment>
        {loading && <Loading text="Fetching new stories" />}

        {error && <p>{error}</p>}

        {stories.length && <StoryList stories={stories} />}
      </React.Fragment>
    );
  }
}
