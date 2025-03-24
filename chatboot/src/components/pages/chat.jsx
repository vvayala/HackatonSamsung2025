
import { useState, useEffect } from "react";
import axios from 'axios';
import "./chat.css"
import Chats from "../chats/chats";
import FormLogin from "../login/login";
import ChatSeccion from "../chats/ChatSeccion";

const PageChat = ({ endPoint }) => {
    const [logueado, setLogeado] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [conversacionApi, setConversacionApi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const datosUsuario = JSON.parse(localStorage.getItem('credencialesUsuario')) || [];

        if (datosUsuario.length > 0) {
            setUsuario(datosUsuario[0]); 
            setLogeado(true);
        }
    }, []); 


    useEffect(() => {
        if (!logueado || !usuario) return;

        const obtenerConversaciones = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/getConversaciones', {
                    id_usuario: usuario.id,
                });

                setConversacionApi(response.data);

            } catch (err) {
                setError('Error al obtener las conversaciones.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        obtenerConversaciones();
    }, [logueado, usuario]);

    // Si no está logueado, mostramos el formulario de login
    if (!logueado) {
        return <FormLogin setLogeado={setLogeado} setUsuario={setUsuario} />;
    }
    if (conversacionApi.length > 0) {
        return <Chats conversaciones={conversacionApi} endPoint={endPoint} />;
    }

    if(conversacionApi.length == 0){
        return <ChatSeccion endPoint={endPoint} idConversacion={null}/>
    }

    if (loading) {
        return <p>Cargando...</p>;
    }
    return <p>No tienes conversaciones disponibles.</p>;
};


export default PageChat;

