import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome, MdChat, MdCalendarMonth, MdContentPaste, MdOutlineTextSnippet } from "react-icons/md";

const navItems = [
  { label: "Home", path: "/hr/home", icon: <MdHome size={20} /> },
  { label: "User List", path: "/hr/users", icon: <MdChat size={20} /> },
  { label: "Leave", path: "/hr/leave", icon: <MdOutlineTextSnippet size={20} /> },
  { label: "Attendance", path: "/hr/attendance", icon: <MdContentPaste size={20} /> },
  { label: "Calendar", path: "/hr/calendar", icon: <MdCalendarMonth size={20} /> },
];

const HRBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="ls-bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`ls-nav-btn ${pathname.includes(item.path) ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="ls-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default HRBottomNav;
