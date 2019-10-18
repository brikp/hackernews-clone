import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { fetchComments, fetchItem } from '../utils/api';
import Loading from './Loading';
import StoryCard from './StoryCard';
import CommentList from './CommentList';

function Post({ location }) {
  const [story, setStory] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [isStoryLoading, setIsStoryLoading] = React.useState(true);
  const [areCommentsLoading, setAreCommentsLoading] = React.useState(true);

  React.useEffect(() => {
    const { id } = queryString.parse(location.search);
    fetchItem(id)
      .then((storyResponse) => {
        setStory(storyResponse);
        setIsStoryLoading(false);
        fetchComments(storyResponse)
          .then((res) => {
            setComments(res);
            setAreCommentsLoading(false);
          });
      });
  }, [location]);

  return (
    <React.Fragment>
      {isStoryLoading && <Loading text="Fetching story" />}

      {story && (
        <StoryCard
          cssClass="pad"
          by={story.by}
          kids={comments || []}
          title={story.title}
          time={story.time}
          url={story.url}
          id={story.id}
        />
      )}

      {(!isStoryLoading && areCommentsLoading) && <Loading text="Fetching comments" />}

      {comments && <CommentList comments={comments} />}

    </React.Fragment>
  );
}

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default Post;
