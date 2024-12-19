import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Apuestas = () => {
  const [apuesta, setApuesta] = useState({
    id_usuario: "",
    id_partido: "",
    id_cuenta: "",
    monto: 0,
    cuota: 0,
    estado: "activa",
    tipo_apuesta: "goles", // Puede ser "goles", "marcador" o "estatus"
    apuesta_goles_local: 0,
    apuesta_goles_visitante: 0,
    apuesta_marcador_local: 0,
    apuesta_marcador_visitante: 0,
    apuesta_resultado: "",
  });

  const [error, setError] = useState("");
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [idUsuario, setIdUsuario] = useState(""); // Estado para el id_usuario
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      setUsuarioLogueado(usuarioObj);
      setApuesta((prev) => ({ ...prev, id_usuario: usuarioObj.id })); // Asigna el ID desde el inicio
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setIdUsuario(e.target.value);
    setApuesta((prevApuesta) => ({
      ...prevApuesta,
      [name]: type === "number" ? parseFloat(value) : value.trim(), // Trim para eliminar espacios
    }));
  };

  const validateData = () => {
    if (!apuesta.id_usuario || !apuesta.id_partido.trim() || !apuesta.id_cuenta.trim()) {
      return "Usuario, partido y cuenta bancaria son obligatorios.";
    }

    if (isNaN(apuesta.monto) || apuesta.monto <= 0) {
      return "El monto debe ser un número positivo.";
    }

    if (isNaN(apuesta.cuota) || apuesta.cuota <= 0) {
      return "La cuota debe ser un número positivo.";
    }

    if (apuesta.tipo_apuesta === "goles") {
      if (isNaN(apuesta.apuesta_goles_local) || apuesta.apuesta_goles_local < 0) {
        return "Los goles del equipo local deben ser positivos o cero.";
      }
      if (isNaN(apuesta.apuesta_goles_visitante) || apuesta.apuesta_goles_visitante < 0) {
        return "Los goles del equipo visitante deben ser positivos o cero.";
      }
    }

    return null; // Sin errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación si el usuario está logueado
    if (!usuarioLogueado) {
      alert("Debes iniciar sesión para realizar una apuesta.");
      navigate("/login");
      return;
    }

    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    } else {
      setError("");
    }

    // Preparamos el objeto de datos a enviar
    let apuestaEnviada = { ...apuesta };

    // Dependiendo del tipo de apuesta, eliminamos los campos innecesarios
    if (apuesta.tipo_apuesta === "estatus") {
      // Si la apuesta es de tipo "estatus", eliminamos los campos de goles y marcador
      delete apuestaEnviada.apuesta_goles_local;
      delete apuestaEnviada.apuesta_goles_visitante;
      delete apuestaEnviada.apuesta_marcador_local;
      delete apuestaEnviada.apuesta_marcador_visitante;
    } else if (apuesta.tipo_apuesta === "goles" || apuesta.tipo_apuesta === "marcador") {
      // Si es de tipo goles o marcador, nos aseguramos de que los campos de resultado no se incluyan
      delete apuestaEnviada.apuesta_resultado;
    }

    // Enviamos la solicitud al backend
    try {
      let endpoint;
      if (apuesta.tipo_apuesta === "goles") {
        endpoint = "http://localhost:3001/api/apuestas_goles";
      } else if (apuesta.tipo_apuesta === "marcador") {
        endpoint = "http://localhost:3001/api/apuestas_marcador";
      } else {
        endpoint = "http://localhost:3001/api/apuestas_estatus";
      }

      const response = await axios.post(endpoint, apuestaEnviada);
      alert(response.data.message || "Apuesta realizada con éxito");

      // Reseteamos los valores después de la apuesta
      setApuesta({
        id_usuario: usuarioLogueado.id,
        id_partido: "",
        id_cuenta: "",
        monto: 0,
        cuota: 0,
        estado: "activa",
        tipo_apuesta: "goles",
        apuesta_goles_local: 0,
        apuesta_goles_visitante: 0,
        apuesta_marcador_local: 0,
        apuesta_marcador_visitante: 0,
        apuesta_resultado: "",
      });
    } catch (error) {
      console.error("Error al realizar la apuesta:", error);
      alert("Hubo un error al realizar la apuesta: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Realizar Apuesta</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        {/* Mostrar error si existe */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="id_usuario" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="id_usuario"
            name="id_usuario"
            value={idUsuario} // No se debe permitir editar el id_usuario
            onChange={handleChange}
            placeholder={`${usuarioLogueado?.nombre || ""} , por favor cambie su nombre por el identificador`}
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
            className="form-control"
            id="cuota"
            name="cuota"
            value={apuesta.cuota}
            onChange={handleChange}
            required
          />
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

        {/* Campos condicionales por tipo de apuesta */}
        {apuesta.tipo_apuesta === "goles" && (
          <>
            <div className="mb-3">
              <label htmlFor="apuesta_goles_local" className="form-label">Goles Local</label>
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
              <label htmlFor="apuesta_goles_visitante" className="form-label">Goles Visitante</label>
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

        {apuesta.tipo_apuesta === "estatus" && (
          <div className="mb-3">
            <label htmlFor="apuesta_resultado" className="form-label">Resultado</label>
            <select
              id="apuesta_resultado"
              name="apuesta_resultado"
              className="form-select"
              value={apuesta.apuesta_resultado}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un resultado</option>
              <option value="ganador local">Ganador Local</option>
              <option value="empate">Empate</option>
              <option value="ganador visitante">Ganador Visitante</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">Realizar Apuesta</button>
      </form>
    </div>
  );
};

export default Apuestas;
