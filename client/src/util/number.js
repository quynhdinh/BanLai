/**
 * It takes a number and returns a string with a comma in the appropriate place
 * @param x - The number to be formatted.
 * @returns a string with the number passed in with commas added in the appropriate places.
 */
const moneyFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ';
};

/**
 * It takes a timestamp in milliseconds and returns a string that tells you how long ago that timestamp was
 * @param milli - the time in milliseconds
 */
const getReadableTimeGap = (milli) => {
  const seconds = ((new Date).getTime() - (new Date(milli)).getTime()) / 1000;
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);

  if (d > 0) {
    return d + " ngày trước"
  } else if (h > 0) {
    return h + " giờ trước"
  } else if (m > 0) {
    return m + " phút trước"
  } else if (s > 0) {
    return s + " giây trước"
  } else return ""
};

/**
 * It returns the current time in seconds
 */
const now = () => Math.round(((new Date()).getTime()) / 1000);

/**
 * If the difference between the current time and the last time the data was fetched is less than 10 minutes, then the
 * cache is valid
 * @param lastFetch - The last time the data was fetched from the server.
 * @returns A boolean value.
 */
const isValidCache = (lastFetch) => {
  const current = now();
  const diff = current - lastFetch;
  return diff < 10 * 60;
}

/* Exporting the functions so that they can be used in other files. */
export {
  moneyFormat,
  getReadableTimeGap,
  now,
  isValidCache
}