import { useState, useRef, useEffect } from "react";
import Mensaje from "../mensajes/mensaje";
import EntradaChatBoot from "../input/input";
import { ToastContainer } from "react-toastify";



import axios from "axios";

const ChatSeccion = ({ endPoint, idConversacion }) => {
    const [id_conversacion, setIdConversacion] = useState(idConversacion);

  
    const [mensajesApi, setMensajesApi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mensajes, setMensajes] = useState([{
        actor: 'Chatboot',
        mensaje: 'Hola soy HipertensoBot, ¿En qué puedo ayudarte?'
    }]);

    const contenedorRef = useRef(null);

    // 🚀 Hook para obtener mensajes de la API cuando cambia idConversacion
    useEffect(() => {
        if (id_conversacion !== null) {
            const obtenerMensajes = async () => {
                setLoading(true);
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/getConversacion', {
                        id_conversacion: id_conversacion
                    });
                    setMensajesApi(response.data);
                    console.log("Mensajes obtenidos:", response.data);
                } catch (err) {
                    setError('Error al obtener los mensajes.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            obtenerMensajes();
        }
    }, [id_conversacion]);

    // 🚀 Hook para actualizar mensajes cuando cambia mensajesApi
    useEffect(() => {
        if (mensajesApi.length > 0) {
            setMensajes(mensajesApi);
        }
    }, [mensajesApi]);

    // 🚀 Hook para hacer scroll automático al final
    useEffect(() => {
        if (contenedorRef.current) {
            contenedorRef.current.scrollTo({
                top: contenedorRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [mensajes]);

    // 🚀 Agregar un nuevo mensaje
    const conversacion = (mensaje) => {
        setMensajes((mensajesPrevios) => [...mensajesPrevios, mensaje]);
    };

    // 🚀 Manejar envío de mensajes
    const handleEnviarMensaje = async (mensajeTexto) => {
        const datosUsuario = JSON.parse(localStorage.getItem('credencialesUsuario')) || [];
        const data = datosUsuario[0]
        const mensajeNuevo = {
            mensaje: mensajeTexto,
            actor: data['name']
        };


        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/conversacionChatBoot`, {
                "mensaje" : mensajeTexto,
                "id_usuario" : data['id'],
                "usuario" : data['name'],
                "id_conversacion" : id_conversacion
            
            });
            conversacion(mensajeNuevo);
            const res = response.data

            console.log(res);
            conversacion({
                mensaje: res.mensaje,
                actor: res.tipo_usuario
            });

            setIdConversacion(res.id_conversacion)
        } catch (error) {
            console.error('Error:', error);
            Notificacion("Error al consultar API", "error");
        }
    };

    // Mostrar carga
    if (loading) return <p>Cargando mensajes...</p>;



    return (
        <section className="section_chat">
            <h1 className="title_chatBoot">HipertensoBot</h1>
            <article className="section_chat_group">
                <fieldset id="contenedor_mensaje" ref={contenedorRef}>
                    {mensajes.map((msg, index) => (
                        <Mensaje
                            key={index}
                            tipo_usuario={msg.actor}
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
};

export default ChatSeccion;
