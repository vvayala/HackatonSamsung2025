import { useState } from "react";
import ChatSeccion from "./ChatSeccion";
import "./styleChats.css"
const Chats = ({ conversaciones, endPoint }) => {
    const [idConversacion, setIdConversacion] = useState(null);
    const [modo, setModo] = useState('lista');

    const handleChat = (id, tipo) => {
        if (tipo === 'nueva') {
            setIdConversacion(null); 
            setModo('nueva');
        } else {
            setIdConversacion(id);   
            setModo('existente');
        }
    };

    const volverALaLista = () => {
        setIdConversacion(null);
        setModo('lista');
    };


    if (modo !== 'lista') {
        return (
            <ChatSeccion
                idConversacion={idConversacion}
                endPoint={endPoint}
                onVolver={volverALaLista}
            />
        );
    }

   
    return (
        <section className="listConversaciones">
            <h2>Conversaciones</h2>
            <div className="cardConversacion">
                {conversaciones.map((conversacion, index) => (
                    <div key={index}>
                        <p>{conversacion.created_at}</p>
                        <p>Conversación #{conversacion.id}</p>
                        <button type="button" onClick={() => handleChat(conversacion.id, 'existente')}>
                            Continuar
                        </button>
                    </div>
                ))}
            </div>
            <div className="conversacion_cero">
                <h2>Conversación Nueva</h2>
                <button type="button" onClick={() => handleChat(null, 'nueva')}>
                    Crear
                </button>
            </div>
        </section>
    );
};


export default Chats;