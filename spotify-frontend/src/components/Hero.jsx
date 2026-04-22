import { motion as Motion } from "framer-motion";

export default function Hero() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 p-12 rounded-3xl
      bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
      shadow-2xl"
    >

      <h1 className="text-5xl font-bold mb-4">
        Experience Music Like Never Before 🎧
      </h1>

      <p className="text-lg text-white/80 max-w-xl">
        Discover, play, and feel music with immersive animations
      </p>

    </Motion.div>
  );
}