const createPost = ({ imgUpload, findAndUpdateUser, savePost }) => {
  return async (httpReq) => {
    try {
      const { user } = httpReq.locals;
      // const user = httpReq.locals.user;
      // const { title } = httpReq.body;
      // const imgPath = `${httpReq?.file?.path}`;
      const buffer = httpReq.file?.buffer;

      // const uploadedImage = await imgUpload(buffer);
      // const image = uploadedImage.secure_url;

      await findAndUpdateUser(
        { username: user.username },
        {
          $push: {
            posts: ["hellow there"],
          },
        }
      );

      // const postAuthor = await User.findOne({
      //   username: user.username,
      // });

      // if (!postAuthor)
      //   return res
      //     .status(200)
      //     .json({ success: false, error: "user not found" });

      // const createdPost = await postServices.createPost({
      //   title,
      //   mediaUrl,
      //   postedBy: postAuthor._id,
      // });

      // await User.findOneAndUpdate(
      //   { username: user.username },
      //   {
      //     $push: {
      //       posts: [createdPost._id],
      //     },
      //   }
      // );

      return {
        success: true,
        statusCode: 200,
        body: {
          // image,
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
