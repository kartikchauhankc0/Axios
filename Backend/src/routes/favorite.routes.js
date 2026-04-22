const express = require("express");
const router = express.Router();

const { toggleFavorite, getFavorites } = require("../controllers/favorite.controller");
const { authUser } = require("../middlewares/auth.middleware");

router.post("/toggle", authUser, toggleFavorite);
router.get("/", authUser, getFavorites);

module.exports = router;