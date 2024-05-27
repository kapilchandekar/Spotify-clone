import Header from "./Components/header/Header";
import Sidebar from "./Components/sidebar/Sidebar";
import Tab from "./Components/tab/Tab";
import AudioPlayer from "./Components/AudioPlayer";
import { useEffect, useState } from "react";

import "./App.scss";

const tabs = [
  { name: "For You", color: "textColor3", id: 1 },
  { name: "Top Tracks", color: "textColor2", id: 2 },
  { name: "Favourites", color: "textColor4", id: 3 },
  { name: "Recently Played", color: "textColor1", id: 4 },
];



function App() {
  const [tabData, setTabData] = useState();
  const [tabHeading, setTabHeading] = useState("For You");
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleClickTab = (tabId) => {
    setActiveTab(tabId);
  
    setTabData({ tabId, activeTab });
  };
  
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (currentTab) {
      setTabHeading(currentTab.name);
    }
  }, [activeTab]);

  return (
    <>
      <Header handleClickTab={handleClickTab} activeTab={activeTab} tabs={tabs}  />
      <div className="d-flex flex-md-row flex-column-reverse ">
        <div className="col-lg-6  d-lg-flex">
          <div className="col-lg-4 ">
            <Tab handleClickTab={handleClickTab} activeTab={activeTab} tabs={tabs} />
          </div>
          <div className="col-lg-6">
            <Sidebar tabHeading={tabHeading} tabData={tabData} />
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center">
          <AudioPlayer />
        </div>
      </div>
    </>
  );
}

export default App;
