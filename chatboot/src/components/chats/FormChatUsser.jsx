import InputForm from "./componentInput/InputForm";
import React, { useState } from 'react';
const FormChatUsser = ({enviarPeticionForm}) => {

    const [data, setData] = React.useState({
        valor1: "",
        valor2: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // le enviamos la peticion a la otra funcion que se ejecuta fuera de aqui
        enviarPeticionForm(data);
    }
    return (
        <div className="form-chat-user" onSubmit={submitForm}>
            <form className="form" >
                <p className="form-title">Completa La informacion</p>

                <InputForm title={'Valor 1'}
                    value={data.name}
                    onChange={handleInputChange}
                    name="valor1" />
                <InputForm title={'Valor 2'}
                    value={data.name}
                    onChange={handleInputChange}
                    name="valor2" />


                <button className="submit" type="submit" >
                    Enviar
                </button>
            </form>
        </div>
    )
}

export default FormChatUsser;