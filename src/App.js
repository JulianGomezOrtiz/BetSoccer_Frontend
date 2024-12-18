import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PartidoSimulacion from "./components/partidoSimulacion";
import Apuestas from "./components/apuestas";
import Login from "./components/login";
import Registro from "./components/registro";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar de Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img 
              src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg" 
              alt="Bootstrap Logo" 
              width="30" 
              height="30" 
              className="d-inline-block align-top"
            />
            Simulador de Apuestas
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/apuestas">Apuestas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/partidos">Partidos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/registro">Registrarse</Link>
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
