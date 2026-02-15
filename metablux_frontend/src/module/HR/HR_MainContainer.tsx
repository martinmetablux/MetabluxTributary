import React from "react";

const HRMainContainer:React.FC<{ children: React.ReactNode }> = ({children})=>{
    return(
        <div className="main-container">
           {children}
        </div>
    )
}

export default HRMainContainer