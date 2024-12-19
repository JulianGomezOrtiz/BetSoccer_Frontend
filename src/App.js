import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import PartidoSimulacion from "./components/partidoSimulacion";
import Apuestas from "./components/apuestas";
import Login from "./components/login";
import Registro from "./components/registro";
import jugadorLogo from './assets/jugador.svg';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <div className="container mt-4 ms-5">
            <h1 className="text-center header mb-4">¡Apuesta con confianza, gana con pasión!</h1>
            <div className="row">
              <div className="col-md-6">
                <Apuestas />
              </div>
              <div className="col-md-6 mt-5">
                <PartidoSimulacion />
              </div>
            </div>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

// Component Navbar donde se maneja la lógica de usuario logueado
function NavBar() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (usuario) {
      setUsuarioLogueado(JSON.parse(usuario)); // No necesitas mapear nada adicional
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuarioLogueado(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand fw-bold fs-4" href="/">
        <img 
          src={jugadorLogo} 
          alt="JugadorLogo" 
          width="50" 
          height="50" 
          className="d-inline-block align-center ms-3"
        />
        BetGame
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/apuestas">Apuestas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold" to="/partidos">Partidos</Link>
          </li>

          {!usuarioLogueado ? (
            <>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/registro">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <span className="nav-link fw-bold">Hola, {usuarioLogueado.nombre}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link fw-bold" onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default App;
