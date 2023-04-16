const createPost = ({ imgUpload }) => {
  return async (httpReq) => {
    try {
      // const user = httpReq.locals.user;
      // const { title } = httpReq.body;
      // const imgPath = `${httpReq?.file?.path}`;
      const buffer = httpReq.file?.buffer;

      const uploadedImage = await imgUpload(buffer);
      const image = uploadedImage.secure_url;
      // const mediaUrl = await uploadImgToCloudinary(imgPath);

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
          imr_url: image,
        },
      };
    } catch (e) {
      console.log("here controller ?");
      return {
        success: false,
        statusCode: 500,
        errorMessage: e.message,
      };
    }
  };
};

module.exports = createPost;
