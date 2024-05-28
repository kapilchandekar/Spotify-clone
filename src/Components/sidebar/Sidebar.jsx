import React, { useState } from "react";
import {Col, Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

import TopTracks from "../TopTrack";
import ForYou from "../ForYou";
import Favourites from "../Favourites";
import RecentlyPlayed from "../RecentlyPlayed";
import { useSelector } from "react-redux";

import "./Sidebar.scss";

const Sidebar = ({ tabData, tabHeading }) => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { song } = useSelector((state) => state.audio);

  const newBgColor = {
    bgColor: song?.artwork?.bgColor || "001621",

    textColor1: song?.artwork?.textColor1 || "231c1c",
    textColor2: song?.artwork?.textColor2 || "808080",
    textColor3: song?.artwork?.textColor3 || "ffffff",
  };
  // const placeholderColor = newBgColor?.textColor3;

  const renderContent = () => {
    switch (tabData?.tabId) {
      case 1:
        return <ForYou searchTerm={searchTerm} />;
      case 2:
        return <TopTracks />;
      case 3:
        return <Favourites />;
      case 4:
        return <RecentlyPlayed />;
      default:
        return <ForYou />;
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearchTerm(query);
    }
  };

  return (
    <div>
      <p className="fs-4 fw-bolder text-color-white pt-4 ms-4">{tabHeading}</p>
      <Form onSubmit={handleSearch} inline>
        <Col xs="auto" className="position-relative px-4">
          <input
            type="text"
            placeholder="Search Song, Artist"
            className=" mr-sm-2 w_400 border-0 rounded shadow-none py-2 px-3 custom-placeholder"
            style={{
              backgroundColor: `#${newBgColor?.textColor3}`,
            }}
            onChange={(e) => setQuery(e.target.value)}
          ></input>

          <CiSearch onClick={handleSearch} className="fs-3 search-icon" />
        </Col>
      </Form>
      {renderContent()}
    </div>
  );
};

export default Sidebar;
