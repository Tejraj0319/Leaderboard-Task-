const userService = require("../services/user.service");
const { sendResponse } = require("../utils/response.helper");

const userController = {
  add: async (req, res) => {
    const result = await userService.add(req.body);
    return sendResponse(
      res,
      result.statusCode,
      result.message,
      result.data,
      result.isError
    );
  },

  claimPoints: async (req, res) => {
    const result = await userService.claimPoints(req.body.userId);
    return sendResponse(
      res,
      result.statusCode,
      result.message,
      result.data,
      result.isError
    );
  },

  getLeaderboard: async (req, res) => {
    const result = await userService.getLeaderboard(req.query);
    return sendResponse(
      res,
      result.statusCode,
      result.message,
      result.data,
      result.isError
    );
  },

  resetPoints: async (req, res) => {
    const result = await userService.resetPoints();
    return sendResponse(
      res,
      result.statusCode,
      result.message,
      result.data,
      result.isError
    );
  },
};

module.exports = userController;
