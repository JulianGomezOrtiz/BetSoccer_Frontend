import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después de login
import axios from "axios";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(""); // Para manejar los errores
  const navigate = useNavigate(); // Redirección a la página principal

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3001/login", { correo, contraseña });
  
      // Si la respuesta contiene los datos del usuario
      if (response.data && response.data.usuario) {
        // Normaliza el objeto del usuario antes de guardarlo
        const usuario = {
          id_usuario: response.data.usuario.ID_USUARIO,
          nombre: response.data.usuario.NOMBRE, // Mapear a minúsculas
          correo: response.data.usuario.CORREO,
          rol: response.data.usuario.ROL,
          estado: response.data.usuario.ESTADO,
        };
  
        // Guardar en localStorage
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
  
        // Redirigir al usuario a la página principal
        navigate("/"); // Cambia el path si es necesario
      }
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
      console.error("Error al iniciar sesión", error);
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* Mostrar mensaje de error si ocurre */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
