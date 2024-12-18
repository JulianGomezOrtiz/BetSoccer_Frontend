import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PartidoSimulacion from "./components/partidoSimulacion";
import Apuestas from "./components/apuestas";
import Login from "./components/login";
import Registro from "./components/registro";
import jugadorLogo from './assets/jugador.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar de Bootstrap */}
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
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/registro">Registrarse</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={
            <div className="container mt-4">
              <h1 className="text-center header mb-4">Realiza tus apuestas de fútbol</h1>
              <div className="row">
                <div className="col-md-6">
                  <Apuestas />
                </div>
                <div className="col-md-6">
                  <PartidoSimulacion />
                </div>
              </div>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
