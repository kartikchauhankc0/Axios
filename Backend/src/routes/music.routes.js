const express = require('express')
const musicController = require("../controllers/music.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post(
    "/upload",
    authMiddleware.authArtist,
    upload.fields([
        { name: "music", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    musicController.createMusic
);

// ✅ NEW route
router.get("/me", authMiddleware.authArtist, musicController.getMyMusic);

router.get("/", authMiddleware.authUser, musicController.getAllMusic);

module.exports = router;