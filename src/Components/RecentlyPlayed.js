import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { playSong } from "./lib/songSlices/audioSlice";

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [songData, setSongData] = useState();
 

  const dispatch = useDispatch();

  const handleclickPlaySong = (item) => {
    const newBgColor = {
      bgColor: item?.artwork?.bgColor || "001621",

      textColor2: item?.artwork?.textColor2 || "808080",
      textColor3: item?.artwork?.textColor3 || "ffffff",
    };
    setSongData((prev) => ({ ...prev, ...newBgColor }));
    document.body.style.backgroundColor = `#${newBgColor.bgColor}`;

    dispatch(playSong(item));
  };

  const formatDuration = (durationInMillis) => {
    const minutes = Math.floor(durationInMillis / 6000 / 10);
    const seconds = Math.floor((durationInMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    setLoading(true);
    const recentlyPlayedFromStorage = sessionStorage.getItem("recentlyPlayed");
    if (recentlyPlayedFromStorage) {
      setRecentlyPlayed(JSON.parse(recentlyPlayedFromStorage));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ul className="px-4">
      {recentlyPlayed?.map((item, index) => (
        <li
          className="text-color-white list-unstyled d-flex align-items-center justify-content-between pt-5"
          key={index}
          onClick={() => handleclickPlaySong(item)}
        >
          <div className="d-flex align-items-center">
            <img
              style={{ borderRadius: "48px" }}
              src={item?.artwork?.url.replace("{w}", "48").replace("{h}", "48")}
              alt=""
            />
            <div className="ms-3">
              <p
                className="mb-0 fs-5"
                style={{ color: `#${songData?.textColor3}` }}
              >
                {item?.name}
              </p>
              <p
                className="mb-0 text-color-grey"
                style={{ color: `#${songData?.textColor2}` }}
              >
                {item?.albumName}
              </p>
            </div>
          </div>
          <p className="mb-0 text-color-grey">
            {formatDuration(item?.durationInMillis)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default RecentlyPlayed;
