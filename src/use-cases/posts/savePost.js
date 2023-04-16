const createPost = ({ postDb }) => {
  return async (postInfo) => {
    return await postDb.create(postInfo);
  };
};

module.exports = createPost;
