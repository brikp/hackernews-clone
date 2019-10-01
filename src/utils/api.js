const apiURL = 'https://hacker-news.firebaseio.com/v0';
const params = '.json';

export async function fetchItem(id) {
  try {
    const response = await fetch(`${apiURL}/item/${id}${params}`);
    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

async function fetchTopStories() {
  const response = await fetch(`${apiURL}/topstories${params}`);
  const data = await response.json();

  return data;
}

async function fetchNewStories() {
  const response = await fetch(`${apiURL}/newstories${params}`);
  const data = await response.json();

  return data;
}

export async function fetchTopStoriesData(storiesToFetch = 500, startingIndex = 0) {
  const storyList = await fetchTopStories();
  const trimmedList = storyList.slice(startingIndex, startingIndex + storiesToFetch);
  const promisesToCall = trimmedList.reduce((promises, storyId) => {
    const fn = fetchItem(storyId);
    promises.push(fn);
    return promises;
  }, []);
  return Promise.all(promisesToCall).then((data) => data);
}

export async function fetchNewStoriesData(storiesToFetch = 500, startingIndex = 0) {
  const storyList = await fetchNewStories();
  const trimmedList = storyList.slice(startingIndex, startingIndex + storiesToFetch);
  const promisesToCall = trimmedList.reduce((promises, storyId) => {
    const fn = fetchItem(storyId);
    promises.push(fn);
    return promises;
  }, []);
  return Promise.all(promisesToCall).then((data) => data);
}

export async function fetchUser(user) {
  const response = await fetch(`${apiURL}/user/${user}${params}`);
  const data = await response.json();

  return data;
}

export async function fetchUserPosts(user, numberOfComments) {
  const promisesToCall = user.submitted.reduce((promises, id, index) => {
    if (index > numberOfComments) return promises;
    const fn = fetchItem(id);
    promises.push(fn);
    return promises;
  }, []);
  return Promise.all(promisesToCall).then((data) => data);
}

export async function fetchStoryComments(story) {
  if (!story.kids) return story;
  const promisesToCall = story.kids.map((commentId) => {
    const fn = fetchItem(commentId);
    return fn;
  });
  return Promise.all(promisesToCall).then((data) => data);
}
