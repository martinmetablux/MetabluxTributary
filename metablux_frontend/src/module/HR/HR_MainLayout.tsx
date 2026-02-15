import React from "react";
import BDSideBar from "./sidebar/HR_SideBar";
import './HR_MainLayout.css'
import { Outlet } from "react-router-dom";
import HRMainContainer from "./HR_MainContainer";
import HRBottomNav from "./sidebar/HRBottomNav";
const HRMainLayout: React.FC = () => {
    return (
        <div className="metablux-mainlayout">
             <div className="page-content">
                <BDSideBar />
                <HRBottomNav/>
                <HRMainContainer>
                    <Outlet />
                </HRMainContainer>
            </div>
        </div>
           
    )
}

export default HRMainLayout;