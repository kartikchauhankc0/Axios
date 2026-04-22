const userModel = require("../models/user.model");

// ❤️ Toggle favorite
async function toggleFavorite(req, res) {
  try {
    const userId = req.user.id;
    const { musicId } = req.body;

    const user = await userModel.findById(userId);

    // ✅ FIXED ObjectId comparison
    const isFav = user.favorites.some(
      (id) => id.toString() === musicId
    );

    if (isFav) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== musicId
      );
    } else {
      user.favorites.push(musicId);
    }

    await user.save();

    res.status(200).json({
      message: "Favorite updated",
      favorites: user.favorites,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating favorites",
    });
  }
}

// ❤️ Get favorites
async function getFavorites(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .populate({
        path: "favorites",
        populate: {
          path: "artist",
          select: "username",
        },
      });

    res.status(200).json({
      favorites: user.favorites,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching favorites",
    });
  }
}

module.exports = { toggleFavorite, getFavorites };