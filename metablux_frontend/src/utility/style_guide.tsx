import style from "./style_guide.module.css"
import { MB_Cards } from "../components/cards/MB_cards"
import { MB_Modal } from "../components/modal/MB_modal"
import { useState } from "react"
import { Breadcrumbs, Link, Typography } from "@mui/material"

export const Style_Guide:React.FC=()=>{
    const [MB_ModalOpen,setMB_ModalOpen]=useState(false)
    const [MB_ModalSize, setMB_ModalSize] = useState<"sm" | "md" | "lg" | "xl">("md");

    return (
        <div className="mb-container">
            <br />
            <h1>Welcome to Metablux style Guide</h1>
            <h3>MB Buttons</h3>
            <div className="mb-flex mb-gap-0px-5px">
                <button className="mb-btn mb-btn-primary">mb-btn-primary</button>
                <button className="mb-btn mb-btn-secondary">mb-btn-primary</button>
                <button className="mb-btn mb-btn-danger">mb-btn-danger</button>
            </div>
            <br />
            <h3>MB Cards</h3>
            <div className="mb-flex mb-gap-0px-15px">
                <MB_Cards 
                    height="120px"
                    width="220px"
                    title="Card 1"
                    content="Matablux Card"   
                    padding="0px 5px"
                    background_clr="blue"
                    title_clr="white"
                    content_clr="white"
                />

                <MB_Cards 
                    height="120px"
                    width="220px"
                    title="Card 2"
                    content="Matablux Card"   
                    padding="0px 5px"
                    background_clr="#afafaf"
                    title_clr="white"
                    content_clr="white"
                />

                <MB_Cards 
                    height="120px"
                    width="220px"
                    title="Card 3"
                    content="Matablux Card"   
                    padding="0px 5px"
                    background_clr="rgb(167, 18, 18)"
                    title_clr="white"
                    content_clr="white"
                />
            </div>
            <br />
            <h3>MB Modals</h3>
            <div className="mb-flex mb-gap-0px-5px">
                <button className="mb-btn mb-btn-primary" onClick={()=>{setMB_ModalOpen(true);setMB_ModalSize("sm")}}>MB SM Modal </button>
                <button className="mb-btn mb-btn-primary" onClick={()=>{setMB_ModalOpen(true);setMB_ModalSize("md")}}>MB MD Modal</button>
                <button className="mb-btn mb-btn-primary" onClick={()=>{setMB_ModalOpen(true);setMB_ModalSize("lg")}}>MB LG Modal</button>
                <button className="mb-btn mb-btn-primary" onClick={()=>{setMB_ModalOpen(true);setMB_ModalSize("xl")}}>MB XL Modal</button>
            </div>
            <MB_Modal
                open={MB_ModalOpen}
                onClose={() => setMB_ModalOpen(false)}
                title="Add New Contact"
                size={MB_ModalSize}
                footer={
                    <>
                    <button className="mb-btn mb-btn-secondary" onClick={() => setMB_ModalOpen(false)}>
                        Close
                    </button>
                    <button className="mb-btn mb-btn-primary">Save</button>
                    </>
                }
                >
                {/* Your form inputs here */}
                <div>
                    <h3>{MB_ModalSize.toUpperCase()} Form Data</h3>
                </div>
            </MB_Modal>
            <br />
            <h3>MB Breadcrumbs</h3>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    List
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
            </Breadcrumbs>
            
            

        </div>
    )
}