import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import StoryList from './StoryList';
import Loading from './Loading';
import { fetchUserPosts, fetchUser } from '../utils/api';
import { convertUnixTimeToDateTimeString, createMarkup } from '../utils/commonFunctions';

function User({ location }) {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [isUserLoading, setIsUserLoading] = React.useState(true);
  const [arePostsLoading, setArePostsLoading] = React.useState(true);

  const { id } = queryString.parse(location.search);

  React.useEffect(() => {
    fetchUser(id)
      .then((userRes) => {
        setUser(userRes);
        setIsUserLoading(false);
        fetchUserPosts(userRes, 20)
          .then((postsRes) => {
            const userStories = postsRes.reduce((stories, value) => {
              if (value.type === 'story') stories.push(value);
              return stories;
            }, []);

            setPosts(userStories);
            setArePostsLoading(false);
          });
      });
  }, [id]);

  return (
    <div className="content">
      {isUserLoading && <Loading text="Fetching user data" />}

      {user && (
        <div>
          <h1>{user.id}</h1>
          <h4>
            joined
            <strong>
              {` ${convertUnixTimeToDateTimeString(user.created)} `}
            </strong>
            has
            <strong>
              {` ${user.karma} `}
            </strong>
            karma
          </h4>

          {user.about
          // eslint-disable-next-line react/no-danger
          && <p dangerouslySetInnerHTML={createMarkup(user.about)} />}
        </div>
      )}

      {(!isUserLoading && arePostsLoading) && <Loading text="Fetching user stories" />}

      {posts && (
        <div>
          <h2>Posts</h2>
          {posts.length > 0
            ? <StoryList stories={posts} />
            : <p>This user did not submit any stories yet</p>}
        </div>
      )}
    </div>
  );
}

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

export default User;
