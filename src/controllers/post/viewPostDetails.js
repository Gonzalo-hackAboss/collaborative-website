'use strict'

const handleAsyncError = require("../../services/handleAsyncError");
const sendResponse = require("../../utils/sendResponse");



module.exports = {
    viewPostDetails: handleAsyncError(async (req, res) => {
      const { id } = req.params;
      const post = await viewPostDetail(id);
      sendResponse(res, post);
    })
  };