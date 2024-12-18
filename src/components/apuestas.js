import { useState } from "react";
import axios from "axios";

const Apuestas = () => {
  const [apuesta, setApuesta] = useState({
    id_usuario: "",
    id_partido: "",
    id_cuenta: "",
    monto: 0,
    cuota: 0,
    estado: "activa",
    tipo_apuesta: "goles", // Se puede cambiar entre "goles", "marcador" o "estatus"
    apuesta_goles_local: 0,
    apuesta_goles_visitante: 0,
    apuesta_marcador_local: 0,
    apuesta_marcador_visitante: 0,
    apuesta_resultado: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setApuesta((prevApuesta) => ({
      ...prevApuesta,
      [name]: type === "number" ? parseFloat(value.replace(',', '.')) : value,
    }));
  };

  const validateData = () => {
    if (!apuesta.id_usuario || !apuesta.id_partido || !apuesta.id_cuenta) {
      return "Usuario, partido y cuenta bancaria son obligatorios.";
    }
  
    if (isNaN(parseFloat(apuesta.monto)) || apuesta.monto <= 0) {
      return "El monto debe ser un número positivo.";
    }
  
    if (isNaN(parseFloat(apuesta.cuota)) || apuesta.cuota <= 0) {
      return "La cuota debe ser un número positivo.";
    }
  
    // Validaciones adicionales según el tipo de apuesta
    if (apuesta.tipo_apuesta === "goles") {
      if (isNaN(parseFloat(apuesta.apuesta_goles_local)) || apuesta.apuesta_goles_local < 0) {
        return "El número de goles del equipo local debe ser un número positivo o cero.";
      }
      if (isNaN(parseFloat(apuesta.apuesta_goles_visitante)) || apuesta.apuesta_goles_visitante < 0) {
        return "El número de goles del equipo visitante debe ser un número positivo o cero.";
      }
    }
    // ... Resto de validaciones para marcador y estatus
    return null; // No hay errores
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    } else {
      setError(""); // Limpiar errores si la validación pasa
    }

    try {
      let endpoint;
      if (apuesta.tipo_apuesta === "goles") {
        endpoint = "http://localhost:3001/api/apuestas_goles";
      } else if (apuesta.tipo_apuesta === "marcador") {
        endpoint = "http://localhost:3001/api/apuestas_marcador";
      } else {
        endpoint = "http://localhost:3001/api/apuestas_estatus";
      }

      const response = await axios.post(endpoint, apuesta);
      alert(response.data.message || "Apuesta realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la apuesta:", error);
      alert("Hubo un error al realizar la apuesta: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Realizar Apuesta</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        {/* Mostrar mensaje de error si hay */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="id_usuario" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="id_usuario"
            name="id_usuario"
            value={apuesta.id_usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="id_partido" className="form-label">Partido</label>
          <input
            type="text"
            className="form-control"
            id="id_partido"
            name="id_partido"
            value={apuesta.id_partido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="id_cuenta" className="form-label">Cuenta Bancaria</label>
          <input
            type="text"
            className="form-control"
            id="id_cuenta"
            name="id_cuenta"
            value={apuesta.id_cuenta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="monto" className="form-label">Monto</label>
          <input
            type="number"
            className="form-control"
            id="monto"
            name="monto"
            value={apuesta.monto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cuota" className="form-label">Cuota</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="cuota"
            name="cuota"
            value={apuesta.cuota}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            name="estado"
            value={apuesta.estado}
            onChange={handleChange}
            required
          >
            <option value="activa">Activa</option>
            <option value="cerrada">Cerrada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="tipo_apuesta" className="form-label">Tipo de Apuesta</label>
          <select
            id="tipo_apuesta"
            className="form-select"
            name="tipo_apuesta"
            value={apuesta.tipo_apuesta}
            onChange={handleChange}
            required
          >
            <option value="goles">Goles</option>
            <option value="marcador">Marcador</option>
            <option value="estatus">Estatus</option>
          </select>
        </div>

        {/* Apuesta por goles */}
        {apuesta.tipo_apuesta === "goles" && (
          <>
            <div className="mb-3">
              <label htmlFor="apuesta_goles_local" className="form-label">Goles del Equipo Local</label>
              <input
                type="number"
                className="form-control"
                id="apuesta_goles_local"
                name="apuesta_goles_local"
                value={apuesta.apuesta_goles_local}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apuesta_goles_visitante" className="form-label">Goles del Equipo Visitante</label>
              <input
                type="number"
                className="form-control"
                id="apuesta_goles_visitante"
                name="apuesta_goles_visitante"
                value={apuesta.apuesta_goles_visitante}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Apuesta por marcador */}
        {apuesta.tipo_apuesta === "marcador" && (
          <>
            <div className="mb-3">
              <label htmlFor="apuesta_marcador_local" className="form-label">Marcador Local</label>
              <input
                type="number"
                className="form-control"
                id="apuesta_marcador_local"
                name="apuesta_marcador_local"
                value={apuesta.apuesta_marcador_local}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="apuesta_marcador_visitante" className="form-label">Marcador Visitante</label>
              <input
                type="number"
                className="form-control"
                id="apuesta_marcador_visitante"
                name="apuesta_marcador_visitante"
                value={apuesta.apuesta_marcador_visitante}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Apuesta por resultado */}
        {apuesta.tipo_apuesta === "estatus" && (
          <div className="mb-3">
            <label htmlFor="apuesta_resultado" className="form-label">Resultado de la Apuesta</label>
            <select
              id="apuesta_resultado"
              className="form-select"
              name="apuesta_resultado"
              value={apuesta.apuesta_resultado}
              onChange={handleChange}
              required
            >
              <option value="ganador local">Ganador Local</option>
              <option value="ganador visitante">Ganador Visitante</option>
              <option value="empate">Empate</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Realizar Apuesta</button>
      </form>
    </div>
  );
};

export default Apuestas;
