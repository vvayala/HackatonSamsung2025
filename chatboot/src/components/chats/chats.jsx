import { useState } from "react";
import ChatSeccion from "./ChatSeccion";

const Chats = ({ conversaciones, endPoint }) => {
    const [idConversacion, setIdConversacion] = useState(null);
    const [modo, setModo] = useState('lista'); // 'lista' | 'nueva' | 'existente'

    const handleChat = (id, tipo) => {
        if (tipo === 'nueva') {
            setIdConversacion(null); // id null para nueva conversación
            setModo('nueva');
        } else {
            setIdConversacion(id);   // id de conversación existente
            setModo('existente');
        }
    };

    const volverALaLista = () => {
        setIdConversacion(null);
        setModo('lista');
    };

    // Mostrar ChatSeccion si está en modo 'nueva' o 'existente'
    if (modo !== 'lista') {
        return (
            <ChatSeccion
                idConversacion={idConversacion}
                endPoint={endPoint}
                onVolver={volverALaLista} // Pasamos función para volver
            />
        );
    }

    // Modo lista: Mostrar todas las conversaciones
    return (
        <section className="listConversaciones">
            <h2>Conversaciones</h2>

            <div className="cardConversacion">
                {conversaciones.map((conversacion, index) => (
                    <div key={index}>
                        <h3>{conversacion.id}</h3>
                        <p>{conversacion.created_at}</p>
                        <p>Conversación</p>
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
