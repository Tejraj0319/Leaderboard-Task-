import axiosInstance from "./axiosInstance";

const userApi = {
  // add new user
  addUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/", userData);
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  },

  //claim random points
  claimPoints: async (userId) => {
    try {
      const res = await axiosInstance.post("/claim", {userId});
      return res.data;
    } catch (error) {
      return error.response?.data;
    }
  },

  //get leaderBoard
  getLeaderboard: async (page = 1, limit = 10) => {
    try {
      const res = await axiosInstance.get("/leaderboard", {
        params: { page, limit },
      });
      return res.data;
    } catch (error) {
      return error.response?.data;
    }
  },

  //reset points
  resetPoints: async () => {
    try {
      const res = await axiosInstance.patch("/resetpoints");
      return res.data;
    } catch (error) {
      return error.response?.data;
    }
  },
};

export default userApi;
