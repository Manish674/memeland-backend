// framework --> middlware

const handleMiddlewareCallback = (middlware) => {
  return (req, res, next) => {
    const httpReq = {
      headers: req.headers,
      method: req.method,
      params: req.params,
      body: req.body,
      filePath: req?.file?.path,
    };

    middlware(httpReq).then((response) => {
      if (response.success) {
        res.locals.users = response.data.user;
        next();
      } else {
        res.status(response.statusCode);
        res.json({ success: response.success, message: response.errorMessage });
      }
    });
  };
};

module.exports = handleMiddlewareCallback;
