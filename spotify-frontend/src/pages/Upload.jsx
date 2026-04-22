import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [music, setMusic] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");

  if (user?.role !== "artist") {
    navigate("/");
    return null;
  }

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("music", music);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);

      await API.post("/music/upload", formData);

      navigate("/");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#1f1f1f] to-black">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-white hover:text-primary"
      >
        ← Back
      </button>

      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-gray-800">

        <h2 className="text-2xl mb-4 font-bold">Upload Music 🎤</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 rounded bg-black/60 border border-gray-700"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="mb-3"
          onChange={(e) => setMusic(e.target.files[0])}
        />

        <input
          type="file"
          className="mb-3"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <button
          onClick={upload}
          className="w-full bg-primary p-3 rounded font-semibold text-black hover:scale-105"
        >
          Upload
        </button>

      </div>
    </div>
  );
}