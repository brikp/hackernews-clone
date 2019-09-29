import React from 'react';
import PropTypes from 'prop-types';
import { fetchTopStoriesData } from '../utils/api';
import Loading from './Loading';

function StoryList({ data }) {
  return (
    <ul>
      {data.map((story) => {
        const {
          id,
          score,
          title,
          url,
        } = story;

        return (
          <li key={id}>
            <p>{`ID: ${id}`}</p>
            <p>{`Score: ${score}`}</p>
            <p>{`Title: ${title}`}</p>
            <p>{`URL: ${url}`}</p>
          </li>
        );
      })}
    </ul>
  );
}

StoryList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

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

  // isLoading = () => {
  //   const { stories, error } = this.state;
  //   return !stories && error === null;
  // }

  render() {
    const { stories, error, loading } = this.state;

    return (
      <React.Fragment>
        {loading && <Loading text="Fetching top stories" />}

        {error && <p>{error}</p>}

        {stories.length && <StoryList data={stories} />}
      </React.Fragment>
    );
  }
}
