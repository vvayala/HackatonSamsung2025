import { useState } from "react";
import "./input.css"
const EntradaChatBoot = ({ onEnviarMensaje }) => {
    const [mensaje, setMensaje] = useState("");

    const handleInputChange = (e) => {
        setMensaje(e.target.value);
    };

    const handleClickEnviar = () => {
        if (mensaje.trim() !== "") {
            onEnviarMensaje(mensaje);
            setMensaje("");
        }
    };
    return (

        <div className="messageBox">
            <input required=""
                className="inputChat"
                placeholder="Message..."
                type="text" id="messageInput"
                value={mensaje}
                onChange={handleInputChange}
            />
            <div className="containerInputAccion">

                <button id="sendButton" onClick={handleClickEnviar}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                        <path
                            fill="none"
                            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        ></path>
                        <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="33.67"
                            stroke="#6c6c6c"
                            d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default EntradaChatBoot