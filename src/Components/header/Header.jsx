import { useSelector } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import logo from "../Assets/logo.png";



const Header = ({ handleClickTab, activeTab, tabs }) => {
  const { song } = useSelector((state) => state.audio);

  const newTextColor = {
    textColor2: song?.artwork?.textColor2 || "808080",
    textColor3: song?.artwork?.textColor3 || "ffffff",
  };

  return (
    <div className="d-lg-none d-block">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <img
              src={logo}
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul>
              {tabs.map((tab) => (
                <li
                  key={tab.name}
                  className={`list-unstyled fs-4 ps-4 py-2 ${
                    activeTab === tab.id
                      ? " text-color-white"
                      : "text-color-grey"
                  }`}
                  style={{
                    color:
                      activeTab === tab.id
                        ? `#${newTextColor?.textColor2}`
                        : `#${newTextColor?.textColor3}`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickTab(tab.id)}
                >
                  {tab.name}
                </li>
              ))}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
