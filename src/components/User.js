import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import StoryList from './StoryList';
import Loading from './Loading';
import { fetchUserPosts, fetchUser } from '../utils/api';
import { convertUnixTimeToDateTimeString, createMarkup } from '../utils/commonFunctions';

export default class User extends React.Component {
  state = {
    loadingUser: true,
    loadingPosts: true,
    user: null,
    posts: null,
  }

  componentDidMount() {
    const { location } = this.props;
    const { id } = queryString.parse(location.search);
    fetchUser(id)
      .then((user) => {
        this.setState({ user, loadingUser: false });
        fetchUserPosts(user, 20)
          .then((posts) => {
            const userStories = posts.reduce((stories, value) => {
              if (value.type === 'story') stories.push(value);
              return stories;
            }, []);
            this.setState({ posts: userStories, loadingPosts: false });
          });
      });
  }

  render() {
    const { user, posts, loadingPosts, loadingUser } = this.state;
    return (
      <div className="content">
        {loadingUser && <Loading text="Fetching user data" />}

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

        {(!loadingUser && loadingPosts) && <Loading text="Fetching user stories" />}

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
}

User.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};
