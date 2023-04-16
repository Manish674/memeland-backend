// framework --> controller

const handleExpressCallback = (controller) => {
  return (req, res, next) => {
    const httpReq = {
      headers: req.headers,
      method: req.method,
      params: req.params,
      body: req.body,
      file: req?.file,
      locals: res.locals,
    };

    controller(httpReq).then((response) => {
      /*
       * statusCode
       * success
       * body ? errorMessage
       */
      if (response.success) {
        res.status(response.statusCode);
        res.json({ success: response.success, data: response.body });
      } else {
        res.status(response.statusCode);
        res.json({ success: response.success, message: response.errorMessage });
      }
    });
  };
};

module.exports = handleExpressCallback;
