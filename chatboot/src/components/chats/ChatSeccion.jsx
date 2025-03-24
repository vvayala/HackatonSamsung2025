import { useState, useRef, useEffect } from "react";
import Mensaje from "../mensajes/mensaje";
import EntradaChatBoot from "../input/input";
import { ToastContainer } from "react-toastify";
import Notificacion from "../Notificacion.jsx"
import axios from "axios";
import FormChatUsser from "./FormChatUsser.jsx";

const ChatSeccion = ({ endPoint, idConversacion, onVolver }) => {

    const [id_conversacion, setIdConversacion] = useState(idConversacion);
    const datosUsuario = JSON.parse(localStorage.getItem('credencialesUsuario')) || [];
    const data = datosUsuario[0]

    const [mensajesApi, setMensajesApi] = useState([]);
    const [loading, setLoading] = useState(false);

    const [mostrarFormChat, setMostrarFormChat] = useState(false);

    const [mensajes, setMensajes] = useState([{
        actor: 'Chatboot',
        mensaje: `Hola ${data['name']} soy HipertensoBot, ¿En qué puedo ayudarte?`
    }]);

    const contenedorRef = useRef(null);



    useEffect(() => {
        if (id_conversacion !== null) {
            const obtenerMensajes = async () => {
                setLoading(true);
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/getConversacion', {
                        id_conversacion: id_conversacion
                    });
                    setMensajesApi(response.data);

                } catch (err) {

                    console.log(err);
                    Notificacion("Error al obtener conversacion", "error");

                } finally {
                    setLoading(false);
                }
            };

            obtenerMensajes();
        }
    }, [id_conversacion]);


    useEffect(() => {
        if (mensajesApi.length > 0) {
            setMensajes(mensajesApi);
        }
    }, [mensajesApi]);


    useEffect(() => {
        if (contenedorRef.current) {
            contenedorRef.current.scrollTo({
                top: contenedorRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [mensajes]);


    const conversacion = (mensaje) => {
        setMensajes((mensajesPrevios) => [...mensajesPrevios, mensaje]);
    };


    const enviarConversacion = async (mensajeTexto, dataForm = null) => {
        const mensajeNuevo = {
            mensaje: mensajeTexto,
            actor: data['name']
        };
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/conversacionChatBoot`, {
                "mensaje": mensajeTexto,
                "id_usuario": data['id'],
                "usuario": data['name'],
                "id_conversacion": id_conversacion,
                "dataForm": dataForm
            });
            conversacion(mensajeNuevo);
            const res = response.data
            conversacion(
                {
                    mensaje: res.mensaje,
                    actor: res.tipo_usuario
                });

            setIdConversacion(res.id_conversacion)
        } catch (error) {
            Notificacion("Error al consultar API", "error");
        }finally{
            // condicionamos para que se oculte el form
            if (dataForm != null) setMostrarFormChat(false)
        }
    }

    const enviarPeticionForm = (data) => {
        enviarConversacion("Rellene el formulario",data)
    }

    const handleEnviarMensaje = async (mensajeTexto) => {

        // condicionamos para mostrar el form
        if(mensajeTexto.trim() == 'form'){
            conversacion({
                actor: 'Chatboot',
                mensaje: `${data['name']} completa el siguiente formulario`
            })
            setMostrarFormChat(true)
        }else{
            await enviarConversacion(mensajeTexto);
        }

    };


    if (loading) return <p>Cargando...</p>;

    return (
        <section className="section_chat">
            <div className="header_encabezado_chatboot">
                <h1 className="title_chatBoot">HipertensoBot</h1>
                {onVolver && (
                    <button type="button" onClick={onVolver} className="btn_volver">
                        Volver
                    </button>
                )}
            </div>
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

                    {
                        mostrarFormChat && (
                            <FormChatUsser enviarPeticionForm={enviarPeticionForm}/>
                        )
                    }
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