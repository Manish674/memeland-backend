const fileUpload = ({ multer }) => {
  return (httpReq) => {
    return multer({ storage: multer.memoryStorage() }).single("file");
  };
};

module.exports = fileUpload;
