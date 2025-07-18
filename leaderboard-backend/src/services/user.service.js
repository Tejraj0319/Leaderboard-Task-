const ClaimHistory = require("../models/claimHistory.model");
const User = require("../models/user.model");

const userService = {
  add: async (data) => {
    try {
      const record = await User.findOne({ name: data.name });
      if (record) {
        return {
          statusCode: 400,
          message: "User already exists!",
          data: null,
          isError: true,
        };
      }

      const result = await User.create(data);

      return {
        statusCode: 201,
        message: "User Created!",
        data: result,
        isError: false,
      };
    } catch (error) {
      console.log("Error while creating user: ", error);
      return {
        statusCode: 500,
        message: "User creation failed!",
        data: null,
        isError: true,
      };
    }
  },

  claimPoints: async (userId) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return {
          statusCode: 404,
          message: "user with this id not found!",
          data: null,
          isError: true,
        };
      }

      const randomPoints = Math.floor(Math.random() * 10) + 1;
      user.totalPoints += randomPoints;
      await user.save();

      await ClaimHistory.create({ userId, pointsClaimed: randomPoints });

      return {
        statusCode: 200,
        message: "Points claimed successfully!",
        data: {
          user,
          claimedPoints: randomPoints,
        },
        isError: false,
      };
    } catch (error) {
      console.log("Error while claiming points: ", error);
      return {
        statusCode: 500,
        message: "Claiming points failed!",
        data: null,
        isError: true,
      };
    }
  },

  getLeaderboard: async (params) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        searchField = "name",
        sortField = "totalPoints",
        sortOrder = "desc",
      } = params;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      // Build where condition
      let filter = {};
      if (search && searchField) {
        filter[searchField] = {
          $regex: search,
          $options: "i", // case-insensitive
        };
      }

      // Build sort condition
      const sort = {};
      sort[sortField] = sortOrder === "asc" ? 1 : -1;

      // Fetch paginated and filtered users
      const users = await User.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(take)
        .select("name totalPoints");

      const totalUsers = await User.countDocuments(filter);

      return {
        statusCode: 200,
        message: "Leaderboard fetched successfully",
        isError: false,
        data: {
          users,
          pagination: {
            total: totalUsers,
            page: parseInt(page),
            limit: take,
            totalPages: Math.ceil(totalUsers / take),
          },
        },
      };
    } catch (error) {
      console.error("Error while fetching leaderboard:", error);
      return {
        statusCode: 500,
        message: "Failed to fetch leaderboard",
        data: null,
        isError: true,
      };
    }
  },

  resetPoints: async () => {
    try {
      const result = await User.updateMany({}, { $set: { totalPoints: 0 } });

      return {
        statusCode: 200,
        message: "All user points have been reset to zero.",
        data: result,
        isError: false,
      };
    } catch (error) {
      console.log("Error resetting points:", error);
      return {
        statusCode: 500,
        message: "Failed to reset user points.",
        data: null,
        isError: true,
      };
    }
  },
};

module.exports = userService;
