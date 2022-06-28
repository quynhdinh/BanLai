const moneyFormat = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' đ';
};

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

const now = () => Math.round(((new Date()).getTime()) / 1000);

const isValidCache = (lastFetch) => {
  const current = now();
  const diff = current - lastFetch;
  return diff < 10 * 60;
}
export {
  moneyFormat,
  getReadableTimeGap,
  now,
  isValidCache
}