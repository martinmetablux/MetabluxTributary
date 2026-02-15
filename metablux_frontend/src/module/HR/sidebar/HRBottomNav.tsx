import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdHome, MdPerson, MdAccountBalance, MdHandshake, MdChat } from "react-icons/md";

const navItems = [
  { label: "Home", path: "/bd/home", icon: <MdHome size={20} /> },
  { label: "Pre Leads", path: "/bd/preleads", icon: <MdChat size={20} /> },
  { label: "Leads", path: "/bd/leads", icon: <MdPerson size={20} /> },
  { label: "Accounts", path: "/bd/accounts", icon: <MdAccountBalance size={20} /> },
  { label: "Deals", path: "/bd/deals", icon: <MdHandshake size={20} /> },
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
