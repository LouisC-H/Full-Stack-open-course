import { Link } from "react-router-dom";
import LoggedInStatus from "./LoggedInStatus";

const NavigationMenu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      <LoggedInStatus />
    </div>
  );
};

export default NavigationMenu;
