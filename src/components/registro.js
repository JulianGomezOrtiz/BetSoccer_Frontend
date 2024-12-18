import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
    // Estados para el formulario
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState(''); // Aquí puedes elegir los valores disponibles para el rol
    const [estado, setEstado] = useState('activo'); // Por defecto 'ACTIVO', pero puedes manejarlo de otra forma si es necesario
    const [mensaje, setMensaje] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificación básica del formulario
        if (!nombre || !correo || !contraseña || !rol) {
            setMensaje('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', {
                nombre,
                correo,
                contraseña,
                rol,
                estado, // Enviamos el estado, aunque por defecto esté en la base de datos
            });

            setMensaje(response.data.message); // Asumimos que la respuesta contiene un mensaje de éxito
        } catch (error) {
            setMensaje('Error al registrar el usuario: ' + error.response?.data?.error || 'Error desconocido');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo:</label>
                    <input
                        type="email"
                        id="correo"
                        className="form-control"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        id="contraseña"
                        className="form-control"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rol" className="form-label">Rol:</label>
                    <select
                        id="rol"
                        className="form-select"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar rol</option>
                        <option value="administrador">Administrador</option>
                        <option value="apostador">Apostador</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado:</label>
                    <select
                        id="estado"
                        className="form-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        disabled // Si el estado es fijo en la base de datos, puedes deshabilitar este campo
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            {mensaje && <p className="mt-3">{mensaje}</p>}
        </div>
    );
};

export default Registro;
