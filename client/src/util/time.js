export const now = () => Math.round(((new Date()).getTime()) / 1000);

export const isValidCache = (lastFetch) => {
  const current = now();
  const diff = current - lastFetch;
  console.log("[time gap]: " + diff)
  if (diff < 10 * 60) {
    console.log("cache valid: [lastFetch]: " + lastFetch + ", now: " + current)
    return true;
  } else {
    console.log("cache invalid: [lastFetch]: " + lastFetch + ", now: " + current)
    return false;
  }
}