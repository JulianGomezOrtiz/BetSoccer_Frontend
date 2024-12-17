import React from "react";
import PartidoSimulacion from "./components/partidoSimulacion";
import Apuestas from "./components/apuestas";
import './App.css';

function App() {
  return (
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
              <a className="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Apuestas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Partidos</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido Principal */}
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
    </div>
  );
}

export default App;
