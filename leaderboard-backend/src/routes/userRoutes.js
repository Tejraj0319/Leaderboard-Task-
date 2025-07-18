const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
// POST USER
router.post("/", userController.add);
// POST CLAIMED POINTS
router.post("/claim", userController.claimPoints);
// GET userlist
router.get("/leaderboard", userController.getLeaderboard);
// RESET POINTS TO ZERO
router.patch("/resetpoints", userController.resetPoints);
module.exports = router;
