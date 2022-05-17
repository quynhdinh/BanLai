const db = require("../models");

async function isLiked(zaloId, postId) {
  const entry = await db.CarePostMapping.find({"zaloId": zaloId, "postId": postId})
  return entry ? 1 : 0
}

async function addIsLiked(zaloId, posts) {
  const postsArr = JSON.parse(JSON.stringify(posts))
  for (let post of postsArr) {
    const countLikedPost = await db.CarePostMapping.find({"zaloId": zaloId, "postId": post._id}).countDocuments()
    post.isLiked = (countLikedPost > 0 ? 1 : 0)
  }
  return postsArr
}
module.exports = {addIsLiked, isLiked};