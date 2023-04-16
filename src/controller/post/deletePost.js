const deletePost = ({ findPost, findUser, deletePost, findAndUpdateUser }) => {
  return async (httpReq) => {
    try {
      const { user } = httpReq.locals;
      const { id } = httpReq.params;

      const post = await findPost({ postInfo: { _id: id } });

      if (!post[0]) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "post does not exists",
        };
      }

      const author = await findUser({ username: user.username });

      if (!post[0].postedBy == author[0].username) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "you don't have permission to delete this post ",
        };
      }

      await findAndUpdateUser(
        { _id: post[0].postedBy },
        {
          $pull: { posts: { $in: [post[0]._id] } },
        }
      );

      await deletePost(id);

      return {
        success: true,
        statusCode: 200,
        body: { post: "post deleted" },
      };
    } catch (e) {
      return {
        success: false,
        statusCode: 500,
        errorMessage: e.message,
      };
    }
  };
};

module.exports = deletePost;
