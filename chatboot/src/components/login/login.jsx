

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
            setError('Credenciales incorrectas o error en la solicitud.');
            console.error(err.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <form className="form" onSubmit={handleLogin}>
                <p className="form-title">Sign in to your account</p>
                <div className="input-container">
                    <input 
                        placeholder="Enter email" 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el valor del email
                        required
                    />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <div className="input-container">
                    <input 
                        placeholder="Enter password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el valor de la contraseña
                        required
                    />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="submit" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign in'}
                </button>
                <p className="signup-link">
                    No account?
                    <a href="/register">Sign up</a>
                </p>
            </form>
        </section>
    );
};

export default FormLogin;
