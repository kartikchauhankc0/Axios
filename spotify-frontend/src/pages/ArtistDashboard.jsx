import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ArtistDashboard() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/music/me")
      .then(res => setSongs(res.data.musics))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-[#1f1f1f] to-black">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Songs 🎤</h1>

        <button
          onClick={() => navigate("/upload")}
          className="bg-primary px-4 py-2 rounded hover:scale-105"
        >
          + Upload
        </button>
      </div>

      {songs.length === 0 ? (
        <p className="text-gray-400">No songs uploaded</p>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {songs.map(song => (
            <div key={song._id} className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828]">

              <img
                src={song.thumbnail}
                className="h-32 w-full object-cover rounded"
              />

              <h3 className="mt-2">{song.title}</h3>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}