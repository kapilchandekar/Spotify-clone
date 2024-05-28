import React, { useState } from "react";
import { useGetRelatedArtistQuery } from "./lib/songSlices/shazamSlice";
import { useDispatch } from "react-redux";
import { playSong } from "./lib/songSlices/audioSlice";
import { Spinner } from "react-bootstrap";

const ForYou = ({searchTerm}) => {
  const artistId = 567072;
  const { data, isLoading, error } = useGetRelatedArtistQuery({ id: artistId });
  const [songData, setSongData] = useState();

  const dispatch = useDispatch();

 

  const handleclickPlaySong = (attributes) => {
    const newBgColor = {
      bgColor: attributes?.artwork?.bgColor || "001621",

      textColor2: attributes?.artwork?.textColor2 || "808080",
      textColor3: attributes?.artwork?.textColor3 || "ffffff",
    };
    setSongData((prev) => ({ ...prev, ...newBgColor }));
    document.body.style.backgroundColor = `#${newBgColor.bgColor}`;

    dispatch(playSong(attributes));
  };

  const formatDuration = (durationInMillis) => {
    const minutes = Math.floor(durationInMillis / 6000 / 10);
    const seconds = Math.floor((durationInMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <Spinner />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="px-4">
      {data?.data?.map((item, index) => (
        <li
          className="text-color-white list-unstyled d-flex align-items-center justify-content-between pt-5"
          key={index}
          onClick={() => handleclickPlaySong(item?.attributes)}
        >
          <div className="d-flex align-items-center">
            <img
              style={{ borderRadius: "48px" }}
              src={item?.attributes?.artwork?.url
                .replace("{w}", "48")
                .replace("{h}", "48")}
              alt=""
            />
            <div className="ms-3">
              <p
                className="mb-0 fs-5"
                style={{ color: `#${songData?.textColor3}` }}
              >
                {item?.attributes?.name}
              </p>
              <p
                className="mb-0 text-color-grey"
                style={{ color: `#${songData?.textColor2}` }}
              >
                {item?.attributes?.albumName}
              </p>
            </div>
          </div>
          <p className="mb-0 text-color-grey">
            {formatDuration(item?.attributes?.durationInMillis)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ForYou;
