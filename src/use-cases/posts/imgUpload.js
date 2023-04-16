const { Readable } = require("stream");

const imgUpload = (cloudinary) => {
  return async (buffer) => {
    //   const writeStream = await cloudinary.uploader
    //     .upload_stream({ resource_type: "raw" }, function (error, result) {
    //       if (error) {
    //         return error;
    //       }
    //       return result;
    //     })
    //     .end(buffer);

    //   const readStream = new Readable({
    //     read() {
    //       this.push(buffer);
    //       this.push(null);
    //     },
    //   });

    //TODO figure out what this code do
    return new Promise((resolve, reject) => {
      const writeStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
      const readStream = new Readable({
        read() {
          this.push(buffer);
          this.push(null);
        },
      });
      readStream.pipe(writeStream);
      console.log("read stream", readStream.pipe(writeStream));
    });

    // return readStream.pipe(writeStream);
  };
};

module.exports = imgUpload;
