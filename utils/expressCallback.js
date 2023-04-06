// framework --> controller 

const handleExpressCallback = (controller) => {
  return (req, res, next) => {

    const httpReq = {
      method: req.method,
      params: req.params,
      body: req.body
    }


    controller(httpReq).then(response => {
      if (response.success) {
        res.status(response.statusCode)
        res.json({ success: response.success, data: response.body })
      } else {
        res.status(response.statusCode)
        res.json({ success: response.success, message: response.errorMessage })
      }
    })
  }
}

module.exports = handleExpressCallback;
