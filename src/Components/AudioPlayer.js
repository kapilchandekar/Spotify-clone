import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { PiSpeakerHighFill, PiSpeakerXFill } from "react-icons/pi";
import { toast } from "react-toastify";

import "./style.scss";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef(null);
  const { song } = useSelector((state) => state.audio);
  //   const dispatch = useDispatch();
  const notify = () => toast("Saved to Favorite list");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const dynamicColor = {
    bgColor: song?.artwork?.bgColor || "001621",

    textColor1: song?.artwork?.textColor1 || "231c1c",
    textColor2: song?.artwork?.textColor2 || "808080",
    textColor3: song?.artwork?.textColor3 || "ffffff",
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
  };

  const handleSeek = (e) => {
    const seekTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress((seekTime / audioRef.current.duration) * 100);
  };

  const handleToggleFavorite = () => {
  // Toggle favorite status
  setIsFavorite(!isFavorite);
  // Update local storage with the favorite list
  let favorites = [];
  const favoritesFromStorage = localStorage.getItem("favorites");
  if (favoritesFromStorage) {
    favorites = JSON.parse(favoritesFromStorage);
  }
  if (isFavorite) {
    // Remove from favorites list
    favorites = favorites.filter((fav) => fav !== song?.name);
  } else {
    // Check if song is not already in favorites list
    if (!favorites.includes(song?.name)) {
      // Add to favorites list
      favorites.push(song);
      notify();
    }
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

  useEffect(() => {
    // Retrieve favorite list from local storage
    const favoritesFromStorage = localStorage.getItem("favorites");
    if (favoritesFromStorage) {
      const favorites = JSON.parse(favoritesFromStorage);
      // Check if the current song is in the favorites list
      setIsFavorite(
        favorites.includes(song?.name, song?.artist, song?.thumbUrl)
      );
    }
  }, [song]);

  useEffect(() => {
    if (song) {
      // Update recently played list in session storage
      const recentlyPlayedFromStorage =
        sessionStorage.getItem("recentlyPlayed");
      let recentlyPlayed = recentlyPlayedFromStorage
        ? JSON.parse(recentlyPlayedFromStorage)
        : [];

      // Add the new song to the beginning of the list
      recentlyPlayed = [
        song,
        ...recentlyPlayed.filter((s) => s.name !== song.name),
      ];

      // Keep only the last 10 played songs
      if (recentlyPlayed.length > 10) {
        recentlyPlayed = recentlyPlayed.slice(0, 10);
      }

      sessionStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
    }
  }, [song]);

  return (
    <div className="player px-lg-0 px-4">
      <h3
        className="fw-bold text-color-white pt-4"
        style={{ color: `#${dynamicColor?.textColor1}` }}
      >
        {song?.name}
      </h3>
      <p style={{ color: `#${dynamicColor?.textColor2}` }}>{song?.albumName}</p>
      <div>
        {song?.artwork?.url && (
          <img
            className="rounded w-100"
            src={song?.artwork?.url.replace("{w}", "480").replace("{h}", "480")}
            alt={`${song.name} artwork`}
          />
        )}
      </div>
      <audio
        ref={audioRef}
        src={song?.previews[0]?.url}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
      {song && (
        <div className="progress mt-3" onClick={handleSeek}>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {song && (
        <div className="controls d-flex justify-content-between mt-4">
          <div
            className="d-flex align-items-center rounded-circle px-lg-14  px-2 text-color-white bg-grey "
            onClick={handleToggleFavorite}
          >
            <BsThreeDots />
          </div>
          <div className="d-flex align-items-center">
            <TbPlayerTrackPrevFilled className="text-dark-emphasis fs-3 " />
            <div
              className="d-flex text-white fs-1 mx-4"
              style={{ color: `#${dynamicColor?.bgColor}` }}
              onClick={togglePlay}
            >
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <TbPlayerTrackNextFilled className="text-dark-emphasis fs-3" />
          </div>
          <div className="d-flex align-items-center rounded-circle px-lg-14  px-2 text-color-white bg-grey ">
            <PiSpeakerHighFill />
            {/* <PiSpeakerXFill /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
