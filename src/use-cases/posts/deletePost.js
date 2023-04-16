const deletePost = ({ postDb }) => {
  return async (id) => {
    return await postDb.findOneAndDelete({ _id: id });
  };
};

module.exports = deletePost;
