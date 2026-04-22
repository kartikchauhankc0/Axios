import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward
} from "lucide-react";

export default function Player({ song, playlist = [] }) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentIndex = useMemo(() => {
    if (!song) return -1;
    return playlist.findIndex((s) => s._id === song._id);
  }, [song, playlist]);

  const playRandomSong = useCallback(() => {
    if (playlist.length === 0) return;

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
    } while (randomIndex === currentIndex && playlist.length > 1);

    const next = playlist[randomIndex];

    if (audioRef.current) {
      audioRef.current.src = next.uri;
      audioRef.current.load();
      audioRef.current.play();
      setPlaying(true);
    }
  }, [playlist, currentIndex]);

  // ▶️ PLAY SONG
  useEffect(() => {
    if (!audioRef.current || !song) return;

    const audio = audioRef.current;

    audio.src = song.uri;
    audio.load();

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      playRandomSong();
    };

    audio.play()
      .then(() => setPlaying(true))
      .catch((err) => console.log("Play error:", err));

  }, [song, playRandomSong]);

  // ▶️ PLAY / PAUSE
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) audioRef.current.pause();
    else audioRef.current.play();

    setPlaying(!playing);
  };

  // ⏭ NEXT
  const nextSong = () => {
    playRandomSong();
  };

  // ⏮ PREV
  const prevSong = () => {
    if (playlist.length === 0) return;

    const prevIndex =
      (currentIndex - 1 + playlist.length) % playlist.length;

    const prev = playlist[prevIndex];

    audioRef.current.src = prev.uri;
    audioRef.current.load();
    audioRef.current.play();
    setPlaying(true);
  };

  // 🎚 SEEK
  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // ⏱ FORMAT
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!song) return null;

  return (
    <>
      <audio ref={audioRef} preload="metadata" />

      {/* MINI */}
      {!expanded && (
        <div
          className="fixed bottom-5 right-5 bg-black/70 p-4 rounded-xl cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <div className="flex items-center gap-3">
            <img src={song.thumbnail} className="h-12 w-12 rounded" />
            <p className="text-sm">{song.title}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="ml-auto bg-green-400 p-2 rounded-full"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
      )}

      {/* FULL */}
      {expanded && (
        <Motion.div className="fixed inset-0 flex items-center justify-center bg-black">

          <button
            onClick={() => setExpanded(false)}
            className="absolute top-6 left-6 text-white text-xl"
          >
            ←
          </button>

          <div className="flex gap-16 items-center">

            <img
              src={song.thumbnail}
              className="w-[350px] h-[350px] rounded-2xl"
            />

            <div className="w-[400px]">

              <h1 className="text-3xl font-bold">{song.title}</h1>

              {/* PROGRESS */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full mt-6"
              />

              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              <div className="flex justify-center gap-6 mt-6">

                <button onClick={prevSong}>
                  <SkipBack />
                </button>

                <button
                  onClick={togglePlay}
                  className="bg-green-400 p-4 rounded-full text-black"
                >
                  {playing ? <Pause /> : <Play />}
                </button>

                <button onClick={nextSong}>
                  <SkipForward />
                </button>

              </div>

            </div>

          </div>

        </Motion.div>
      )}
    </>
  );
}