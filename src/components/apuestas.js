import { useState } from "react";
import axios from "axios";

const Apuestas = () => {
  const [apuesta, setApuesta] = useState({
    id_usuario: "",
    id_partido: "",
    monto: 0,
    tipo_apuesta: "",
    cuota: 0,
    estado: "pendiente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApuesta((prevApuesta) => ({
      ...prevApuesta,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/apuestas", apuesta);
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
          <label htmlFor="tipo_apuesta" className="form-label">Tipo de Apuesta</label>
          <input
            type="text"
            className="form-control"
            id="tipo_apuesta"
            name="tipo_apuesta"
            value={apuesta.tipo_apuesta}
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
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            id="estado"
            className="form-select"
            name="estado"
            value={apuesta.estado}
            onChange={handleChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="activa">Activa</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Realizar Apuesta</button>
      </form>
    </div>
  );
};

export default Apuestas;
