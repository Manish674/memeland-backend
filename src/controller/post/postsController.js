const postController = ({ findPost }) => {
  return async (httpReq) => {
    try {
      //first argument is the postInfo 
      //second argument is populate argument
      const posts = await findPost({ populateBy: "postedBy" })
      return {
        success: true,
        statusCode: 200,
        body: {
          posts
        }
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        statusCode: 500,
        errorMessage: e.message
      }
    }
  }
}

module.exports = postController;
