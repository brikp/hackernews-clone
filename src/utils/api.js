const api_url = 'https://hacker-news.firebaseio.com/v0';
const params ='.json';

async function fetchItem(id) {
  try {
    const response = await fetch(`${api_url}/item/${id}${params}`)
    const data = await response.json();
    return data;
  }
  catch (e){
    throw new Error(e);
  }
}

async function fetchTopStories () {
  const response = await fetch(`${api_url}/topstories${params}`);
  const data = await response.json();

  return data;
}

async function fetchNewStories () {
  const response = await fetch(`${api_url}/newstories${params}`);
  const data = await response.json();

  return data;
}

export async function fetchTopStoriesData(storiesToFetch = 500, startingIndex = 0) {
  const storyList = await fetchTopStories();
  const trimmedList = storyList.slice(startingIndex, startingIndex + storiesToFetch);
  const promisesToCall = trimmedList.reduce((promises, storyId) => {
    let fn = fetchItem(storyId);
    promises.push(fn);
    return promises;
  }, [])
  return Promise.all(promisesToCall).then((data) => data);
}

export async function fetchNewStoriesData(storiesToFetch = 500, startingIndex = 0) {
  const storyList = await fetchNewStories();
  const trimmedList = storyList.slice(startingIndex, startingIndex + storiesToFetch);
  const promisesToCall = trimmedList.reduce((promises, storyId) => {
    let fn = fetchItem(storyId);
    promises.push(fn);
    return promises;
  }, [])
  return Promise.all(promisesToCall).then((data) => data);
}



export async function fetchUser(user) {
  const response = await fetch(`${api_url}/user/${user}${params}`)
  const data = await response.json();

  return data;
}

export async function fetchUserPosts(user, numberOfComments) {
  const promisesToCall = user.submitted.reduce((promises, id, index) => {
    if (index > numberOfComments) return promises;
    let fn = fetchItem(id);
    promises.push(fn);
    return promises;
  }, []);
  return Promise.all(promisesToCall).then((data) => data);
}

export async function fetchStoryWithComments(storyId) {
  const story = await fetchItem(storyId);
  if (!story.kids) return story;
  const promisesToCall = story.kids.map((commentId) => {
    let fn = fetchItem(commentId);
    return fn;
  });
  const comments = Promise.add(promisesToCall).then((data) => data);
  story.kids = comments;
  return story;
}

// export async function fetchStoryWithComments(storyId) {
//   const story = await fetchItem(storyId);
//   if (!story.kids) return story;
//   const fullStory = {...story}
//   const kids = [];
//   //TODO: Rewrite using reduce
//   fullStory.kids.forEach(async (id) => {
//     let kid = await fetchStoryWithComments(id);
//     kids.push(kid);
//   })
//   fullStory.kids = kids;
//   return fullStory;
// }