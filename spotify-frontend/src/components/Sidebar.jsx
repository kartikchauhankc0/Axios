import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Home, Upload, Music } from "lucide-react";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-64 h-screen p-6 flex flex-col
    bg-white/5 backdrop-blur-xl border-r border-white/10">

      <h1 className="text-3xl font-bold mb-10 text-green-400">
        Axios 🎧
      </h1>

      <nav className="flex flex-col gap-6 text-gray-300">

        <Link className="flex items-center gap-3 hover:text-green-400" to="/">
          <Home size={20} />
          Home
        </Link>

        {user?.role === "artist" && (
          <>
            <Link className="flex items-center gap-3 hover:text-purple-400" to="/artist">
              <Music size={20} />
              Dashboard
            </Link>

            <Link className="flex items-center gap-3 hover:text-blue-400" to="/upload">
              <Upload size={20} />
              Upload
            </Link>
          </>
        )}

      </nav>

      <div className="mt-auto text-sm text-gray-400">
        {user?.username}
      </div>
    </div>
  );
}