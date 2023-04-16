const findPost = ({ postDb }) => {
  return async ({ postInfo, populateBy }) => {
    console.log('post info --> ',postInfo)
    return await postDb.find(postInfo, populateBy).exec();
  }
}

module.exports = findPost;
