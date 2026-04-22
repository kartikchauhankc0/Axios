import { motion as Motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function MusicCard({
  song,
  setCurrent,
  toggleFavorite,
  isFavorite,
}) {
  return (
    <Motion.div
      whileHover={{ scale: 1.05 }}
      layout
      className={`relative cursor-pointer rounded-2xl overflow-hidden
      ${isFavorite ? "col-span-2 row-span-2" : "col-span-1"}
      bg-white/5 backdrop-blur border border-white/10`}
    >

      {/* ❤️ Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(song._id);
        }}
        className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full"
      >
        <Heart
          size={16}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
        />
      </button>

      {/* Image */}
      <img
        src={song.thumbnail}
        onClick={() => setCurrent(song)}
        className={`w-full object-cover 
        ${isFavorite ? "h-64" : "h-40"}`}
      />

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-400">
          {song.artist?.username}
        </p>
      </div>

    </Motion.div>
  );
}