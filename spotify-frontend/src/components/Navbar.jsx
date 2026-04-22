import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import API from "../api/axios";
import { Heart } from "lucide-react";

export default function Navbar({ showFavorites, setShowFavorites }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await API.post("/auth/logout");
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center px-8 py-5
    bg-white/5 backdrop-blur-xl border-b border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <h1 className="text-xl font-bold">Axios 🎧</h1>

        {/* ❤️ Favorite toggle */}
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`p-2 rounded-full 
          ${showFavorites ? "bg-red-500" : "bg-white/10"}`}
        >
          <Heart />
        </button>

      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-green-400 to-purple-500
        px-5 py-2 rounded-full text-black font-semibold"
      >
        Logout
      </button>

    </div>
  );
}