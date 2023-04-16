const createPost = ({ imgUpload, findUser, findAndUpdateUser, savePost }) => {
  return async (httpReq) => {
    try {
      const { user } = httpReq.locals;
      const { title } = httpReq.body;
      const buffer = httpReq.file?.buffer;

      const uploadedImage = await imgUpload(buffer);
      const mediaUrl = uploadedImage.secure_url;

      const author = await findUser({ username: user.username });

      if (!author)
        return {
          success: false,
          statusCode: 200,
          errorMessage: "creator of post not found",
        };

      const createdPost = await savePost({
        title,
        mediaUrl,
        postedBy: author[0]._id,
        desc: httpReq.body?.desc,
      });

      await findAndUpdateUser(
        { username: user.username },
        {
          $push: {
            posts: [createdPost._id],
          },
        }
      );

      return {
        success: true,
        statusCode: 200,
        body: {
          post: createdPost,
        },
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

module.exports = createPost;
