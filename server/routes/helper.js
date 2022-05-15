const db = require("../models");

async function isLiked(zaloId, postId) {
  const entry = await db.CarePostMapping.find({"zaloId": zaloId, "postId": postId})
  if (entry) {
    console.log("ok")
    return 1
  } else{
    console.log("fail")
    return 0
  }
}

async function addIsLiked(zaloId, posts) {
  const postsArr = JSON.parse(JSON.stringify(posts))
  for (let i = 0; i < postsArr.length; i++) {
    let isLiked = 0
    const countLikedPost = await db.CarePostMapping.find({"zaloId": zaloId, "postId": postsArr[i]._id}).countDocuments()
    if (countLikedPost > 0) {
      isLiked = 1;
    }
    postsArr[i].isLiked = isLiked
  }
  return postsArr
}
module.exports = {addIsLiked, isLiked};