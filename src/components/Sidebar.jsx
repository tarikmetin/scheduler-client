import sidebarContent from "../data/sidebarContent";
import ChevronIcon from "../ui/icons/ChevronIcon";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function SideBar() {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  const { user } = useAuthContext();
  const { logout } = useLogout();

  function handleCollapse() {
    setSidebarHidden(!sidebarHidden);
  }

  return (
    <div className={`sidebar ${sidebarHidden ? "collapsed" : ""}`}>
      <button
        className={`drawer ${sidebarHidden ? "rotated" : ""}`}
        onClick={handleCollapse}
      >
        <ChevronIcon />
      </button>
      <ul className="sidebar-list">
        {sidebarContent.map((sidebarItem, index) => (
          <li key={index} className="">
            <Link className="link" to={`/${sidebarItem.url}`}>
              <div
                className={`sidebar-item-box ${sidebarHidden ? "hidden" : ""}`}
              >
                {sidebarItem.icon}
                <p>{sidebarItem.text}</p>
              </div>
            </Link>
          </li>
        ))}
        {user && !sidebarHidden && (
          <button onClick={() => logout()}>Logout</button>
        )}
      </ul>
    </div>
  );
}
