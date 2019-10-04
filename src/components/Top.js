import React from 'react';
import { fetchTopStoriesData } from '../utils/api';
import Loading from './Loading';
import StoryList from './StoryList';

// TODO: Refactor Top/New components to minimize code repetition
export default class Top extends React.Component {
  state = {
    stories: [],
    error: null,
    loading: true,
  }

  componentDidMount() {
    fetchTopStoriesData(50)
      .then((data) => {
        this.setState({ stories: data, loading: false });
      })
      .catch((e) => {
        console.warn('Error fetching data: ', e);
        this.setState({ error: 'There was an error fetching data', loading: false });
      });
  }

  isLoading = () => {
    const { loading } = this.state;
    return loading;
  }

  render() {
    const { stories, error } = this.state;
    return (
      <React.Fragment>
        {this.isLoading() && <Loading text="Fetching top stories" />}

        {error && <p>{error}</p>}

        {stories && <StoryList stories={stories} />}
      </React.Fragment>
    );
  }
}
