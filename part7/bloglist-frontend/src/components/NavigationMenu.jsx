import { Link } from "react-router-dom";
import LoggedInStatus from "./LoggedInStatus";
import { Navbar, Nav } from "react-bootstrap";

const NavigationMenu = () => {
  const padding = {
    paddingLeft: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" data-bs-theme="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              Users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <LoggedInStatus />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationMenu;
