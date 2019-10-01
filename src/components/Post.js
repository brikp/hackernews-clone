import React from 'react';
import queryString from 'query-string';
import { fetchStoryWithComments, fetchItem } from '../utils/api';
import Loading from './Loading';
import StoryCard from './StoryCard';

export default class Post extends React.Component {
  state = {
    story: null,
    comments: null,
    loadingStory: true,
    loadingComments: true,
  }

  componentDidMount() {
    const { location } = this.props;
    const { id } = queryString.parse(location.search);
    fetchItem(id)
      .then((story) => {
        this.setState({ story, loadingStory: false });
        fetchStoryWithComments(story)
          .then((res) => {
            this.setState({ comments: res.kids, loadingComments: false });
          });
      });
  }

  render() {
    const { story, comments, loadingStory, loadingComments } = this.state;
    return (
      <React.Fragment>
        {loadingStory && <Loading text="Fetching story" />}

        {loadingComments && <Loading text="Fetching comments" />}

        {story && (
          <StoryCard
            by={story.by}
            kids={comments || []}
            title={story.title}
            time={story.time}
            url={story.url}
            id={story.id}
          />
        )}

      </React.Fragment>
    );
  }
}
