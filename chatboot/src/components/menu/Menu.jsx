import "./menu.css"
import React from "react";
const Menu = ({ opcionSeleccionada, endPoint }) => {

    const handleMenuClick = (view) => {
        opcionSeleccionada(view)
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="container_menu">

                    <div className="logo-details">

                        <div className="container_img-logo">

                            <img src={`${endPoint}/assets/assets/chatbot.png`} alt="Logo" />
                        </div>
                    </div>
                    <div className="nav-list">

                        <button onClick={() => handleMenuClick("HipertensoBot")}>
                            <div className="icon_item_menu">
                                <img src={`${endPoint}/assets/assets/chatbot.png`} alt="Logo" />
                            </div>
                            <span className="links_name">CHAT BOOT</span>
                        </button>

                        <button onClick={() => handleMenuClick("op2")}>
                            <div className="icon_item_menu">
                                <img src={`${endPoint}/assets/assets/usser.png`} alt="Logo" />
                            </div>
                            <span className="links_name">Opcion 2</span>
                        </button>

                        <button onClick={() => handleMenuClick("creadores")}>
                            <div className="icon_item_menu">
                                <img src={`${endPoint}/assets/assets/usser.png`} alt="Logo" />
                            </div>
                            <span className="links_name">Creadores</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;