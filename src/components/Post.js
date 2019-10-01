import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { fetchStoryComments, fetchItem } from '../utils/api';
import Loading from './Loading';
import StoryCard from './StoryCard';
import CommentList from './CommentList';

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
        fetchStoryComments(story)
          .then((res) => {
            this.setState({ comments: res, loadingComments: false });
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

        {comments && <CommentList comments={comments} />}

      </React.Fragment>
    );
  }
}

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
