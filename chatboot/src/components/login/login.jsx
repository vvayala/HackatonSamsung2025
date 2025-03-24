

import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";

const FormLogin = ({ setLogeado }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true); 

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/loginUsuario', {
                email,
                password,
            });

            localStorage.setItem('credencialesUsuario', JSON.stringify([response.data.usuario]));

            console.log('Usuario autenticado:', response.data.usuario);

            setLogeado(true)
        } catch (err) {
            setError('Usuario incorrecto o error en la solicitud.');
            console.error(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='seccion_login'>
            <form className="form" onSubmit={handleLogin}>
                <p className="form-title">Ingresa Tu nombre</p>
                <div className="input-container">
                    <input 
                        placeholder="Nombre de usuario" 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="submit" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Seguir'}
                </button>
            </form>
        </section>
    );
};

export default FormLogin;
