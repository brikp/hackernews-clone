export function convertUnixTimeToDateTimeString(unixTime) {
  const time = new Date(unixTime * 1000).toUTCString();
  return time;
}

export function createMarkup(text) {
  return { __html: text };
}
