import { useEffect, useState } from "react";
import API from "../api/axios";
import MusicCard from "../components/MusicCard";
import Player from "../components/Player";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageWrapper from "../components/PageWrapper";
import Skeleton from "../components/Skeleton";
import CursorGlow from "../components/CursorGlow";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    API.get("/music")
      .then((res) => {
        setSongs(res.data.musics || []);
        setLoading(false);
      })
      .catch(console.log);

    API.get("/favorites")
      .then((res) => {
        const favIds = res.data.favorites.map((f) => f._id.toString());
        setFavorites(favIds);
      })
      .catch(console.log);
  }, []);

  const toggleFavorite = async (musicId) => {
    try {
      const res = await API.post("/favorites/toggle", { musicId });
      const favIds = res.data.favorites.map((id) => id.toString());
      setFavorites(favIds);
    } catch (err) {
      console.log(err);
    }
  };

  const displayedSongs = showFavorites
    ? songs.filter((s) => favorites.includes(s._id))
    : songs;

  return (
    <div className="flex">

      <AnimatedBackground />
      <CursorGlow />

      <Sidebar />

      <PageWrapper>
        <div className="flex-1 min-h-screen px-8">

          <Navbar
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
          />

          <div className="grid grid-cols-5 auto-rows-[150px] gap-6">

            {loading
              ? Array(10).fill(0).map((_, i) => (
                  <Skeleton key={i} />
                ))
              : displayedSongs.map((song) => (
                  <MusicCard
                    key={song._id}
                    song={song}
                    setCurrent={setCurrent}
                    toggleFavorite={toggleFavorite}
                    isFavorite={favorites.includes(song._id)}
                  />
                ))}

          </div>

        </div>
      </PageWrapper>

      {/* ✅ IMPORTANT FIX */}
      <Player song={current} playlist={displayedSongs} />

    </div>
  );
}