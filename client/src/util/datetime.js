export const currentDateTime = () => {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  return dateTime;
}

export const isValidCache = (lastFetch) => {
  var current = new Date(currentDateTime());
  var diff = current -lastFetch;
  console.log("diff in ms here: " + diff)
  return diff < 180000 // 3 phut
}