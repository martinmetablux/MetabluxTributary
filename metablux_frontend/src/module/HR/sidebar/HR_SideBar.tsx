import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdHome, MdPerson, MdContentPaste, MdOutlineTextSnippet, MdCalendarMonth } from "react-icons/md";

const HRSideBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // ===((( isCollapsed = true to open else close )))===

    return (
         <div className={`sidebar ${!isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {isCollapsed && <h2>HR Dashboard</h2>}
            </div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <IoIosArrowBack size={16} className={!isCollapsed ? 'rotate-180' : ''} />
            </button>
            <nav>
                <ul className="sidebar-nav">
                    <li onClick={() => navigate(`/hr/home`)} className={`nav-item ${pathname.includes('/hr/home') ? 'active' : ''} `}>
                        <MdHome size={20} />
                        {isCollapsed && <span>Home</span>}
                    </li>
                       <li onClick={() => navigate(`/hr/users`)} className={`nav-item ${pathname.includes('/hr/users') ? 'active' : ''} `}>
                        <MdPerson size={20} />
                        {isCollapsed && <span>User List</span>}
                    </li>
                    <li onClick={() => navigate(`/hr/leave`)} className={`nav-item ${pathname.includes('/hr/leave') ? 'active' : ''} `}>
                        <MdOutlineTextSnippet size={20} />
                        {isCollapsed && <span>Leave</span>}
                    </li>
                    <li onClick={() => navigate(`/hr/attendance`)} className={`nav-item ${pathname.includes('/hr/attendance') ? 'active' : ''} `}>
                        <MdContentPaste size={20} />
                        {isCollapsed && <span>Attendance</span>}
                    </li>
                    <li onClick={() => navigate(`/hr/calendar`)} className={`nav-item ${pathname.includes('/hr/calendar') ? 'active' : ''} `}>
                        <MdCalendarMonth size={20} />
                        {isCollapsed && <span>Calendar</span>}
                    </li>
                    
                </ul>
            </nav>
        </div>
    );
};

export default HRSideBar;