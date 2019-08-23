export default (req, res) => ({
  device: {
    isMobile: res.isMobile,
  },
  req: {
    basePath: req.basePath,
    params: req.params,
    query: req.query,
    url: req.url,
    currentStatus: req.currentStatus,
    code: res.session('userToken').access_token,
  },
});
