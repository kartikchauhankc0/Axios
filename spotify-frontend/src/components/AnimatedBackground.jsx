export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* 🌈 Moving Gradient */}
      <div className="absolute inset-0 
      bg-gradient-to-r from-purple-500 via-green-400 to-blue-500
      opacity-20 blur-3xl animate-gradient bg-200%" />

      {/* 🟢 Glow Blob 1 */}
      <div className="absolute top-20 left-20 w-72 h-72
      bg-green-400 opacity-20 rounded-full blur-3xl
      animate-pulse" />

      {/* 🟣 Glow Blob 2 */}
      <div className="absolute bottom-20 right-20 w-72 h-72
      bg-purple-500 opacity-20 rounded-full blur-3xl
      animate-pulse" />

    </div>
  );
}