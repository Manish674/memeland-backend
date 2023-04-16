const findPost = (postDb) => {
  return async ({ postInfo, populateBy }) => {
    return await postDb.find(postInfo, populateBy).exec();
  }
}

module.exports = findPost;
