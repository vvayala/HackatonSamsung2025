
import Mensaje from "../mensajes/mensaje";
import EntradaChatBoot from "../input/input";
import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import Notificacion from "../Notificacion";
import "./chat.css"
const PageChat = ({ endPoint }) => {
    // aqui almacenaremos los mensajes que se envien y reciban
    const mensajesGuardados = JSON.parse(localStorage.getItem('mensajesHipertensoBot')) || [];
    const [mensajes, setMensajes] = useState(mensajesGuardados.length > 0
        ? mensajesGuardados
        : [{ tipo_usuario: 'Chatboot', mensaje: 'Hola soy HipertensoBot, ¿En qué puedo ayudarte?' }]
    );

    const conversacion = (mensaje) => {
        setMensajes((mensajesPrevios) => {
            const nuevosMensajes = [...mensajesPrevios, mensaje];
            localStorage.setItem('mensajesHipertensoBot', JSON.stringify(nuevosMensajes));
            return nuevosMensajes;
        });
        // setMensajes((mensajesPrevios) => [...mensajesPrevios, mensaje]);
    }

    // este evento se ejecuta cuando cuando presionan el boton de enviar mensaje
    const handleEnviarMensaje = async (mensajeTexto) => {

        // componemos el mensaje, el tipo usuario podria ser cualquiera
        const mensajeNuevo = {
            mensaje: mensajeTexto,
            tipo_usuario: 'Dani'
        }

        conversacion(mensajeNuevo)

        // api lista para funcionar
        try {
            const response = await axios.post(`${endPoint}/HipertensoBot`, mensajeNuevo);
            conversacion(response.data)
        } catch (error) {
            console.error('Error:', error);
            Notificacion("Error Al consultar Api", "error");
        }

    };

    // esto es para que cuando, se cubra los mensajes del alto de la seccion, se haga scroll en automatico al ultimo mensaje

    const contenedorRef = useRef(null);
    useEffect(() => {
        if (contenedorRef.current) {
            contenedorRef.current.scrollTo({
                top: contenedorRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [mensajes]);
    return (

        <section className="section_chat">
            <h1 className="title_chatBoot">HipertensoBot</h1>
            <article className="section_chat_group">
                <fieldset id="contenedor_mensaje" ref={contenedorRef}>
                    {mensajes.map((msg, index) => (
                        <Mensaje
                            key={index}
                            tipo_usuario={msg.tipo_usuario}
                            mensaje={msg.mensaje}
                            endPoint={endPoint}
                        />
                    ))}
                </fieldset>
                <fieldset id="contendor_input">
                    <EntradaChatBoot onEnviarMensaje={handleEnviarMensaje} />
                </fieldset>
            </article>
            <ToastContainer />
        </section>

    )
}
export default PageChat;
