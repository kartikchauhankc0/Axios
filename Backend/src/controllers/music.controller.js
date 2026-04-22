const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
    const { title } = req.body;

    const musicFile = req.files?.music?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (!musicFile || !thumbnailFile) {
        return res.status(400).json({ message: "Music & thumbnail required" });
    }

    const musicUpload = await uploadFile(
        musicFile.buffer.toString("base64")
    );

    const thumbnailUpload = await uploadFile(
        thumbnailFile.buffer.toString("base64")
    );

    const music = await musicModel.create({
        uri: musicUpload.url,
        title,
        thumbnail: thumbnailUpload.url,
        artist: req.user.id,
    });

    res.status(201).json({
        message: "Music created successfully",
        music,
    });
}

// ✅ NEW: get only artist songs
async function getMyMusic(req, res) {
    const musics = await musicModel
        .find({ artist: req.user.id })
        .populate("artist", "username email");

    res.status(200).json({
        musics,
    });
}

async function getAllMusic(req, res) {
    const musics = await musicModel
        .find()
        .populate("artist", "username email");

    res.status(200).json({
        musics,
    });
}

module.exports = {
    createMusic,
    getAllMusic,
    getMyMusic
};