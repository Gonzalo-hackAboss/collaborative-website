"use strict";

const handleAsyncError = require("../../services/handleAsyncError");
const sendResponse = require("../../utils/sendResponse");
const { getPostById } = require("../../services/dbService.js");

module.exports = async (req, res) => {
    console.log(req);
    return await getPostById(req.params.id);
};

// module.exports = {
//     viewPostDetails: handleAsyncError(async (req, res) => {
//         const { id } = req.params;
//         const post = await (id);
//         sendResponse(res, post);
//     }),
// };

// module.exports = handleAsyncError(async (req, res) => {
//     const { id } = req.params;
//     const post = await viewPostDetail(id);
//     sendResponse(res, post);
// });
