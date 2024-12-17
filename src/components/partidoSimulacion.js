import React, { useState, useEffect } from "react";
import { getPartidos, updatePartido } from "../services/api";
import "./partidoSimulacion.css"; // Importar estilos

const PartidoSimulacion = () => {
  const [partidos, setPartidos] = useState([]);
  const [simulando, setSimulando] = useState(false);
  const [pelotaPosicion, setPelotaPosicion] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await getPartidos();
        console.log("Respuesta completa:", response);

        // Convierte el array de arrays en un array de objetos
        const partidosData = response.data.map(partido => ({
          id_partido: partido[0],
          equipo_local: partido[1],
          equipo_visitante: partido[2],
          fecha_inicio: partido[3],
          fecha_fin: partido[4],
          estadio: partido[5],
          estado: partido[6],
          marcador_local: partido[7],
          marcador_visitante: partido[8],
        }));

        setPartidos(partidosData);
        console.log("Partidos cargados:", partidosData);
      } catch (error) {
        console.error("Error al cargar los partidos", error);
      }
    };
    fetchPartidos();
  }, []);

  const simularPartido = async (partido) => {
    if (!partido.equipo_local || !partido.equipo_visitante) {
      console.error("Partido incompleto:", partido);
      return; // Evita simular partidos con datos incompletos
    }

    setSimulando(true);
    let minuto = 0;

    const intervalo = setInterval(async () => {
      minuto++;
      let marcador_local = partido.marcador_local || 0;
      let marcador_visitante = partido.marcador_visitante || 0;

      // Evento aleatorio
      const evento = Math.random();
      if (evento < 0.1) {
        marcador_local++;
        moverPelota("local");
        alert(`¡Gol del equipo local! ${partido.equipo_local}`);
      } else if (evento < 0.2) {
        marcador_visitante++;
        moverPelota("visitante");
        alert(`¡Gol del equipo visitante! ${partido.equipo_visitante}`);
      } else if (evento < 0.25) {
        alert("¡Penalti! Las apuestas se han cerrado.");
        clearInterval(intervalo);
        return;
      }

      // Actualizar marcador en el backend
      await updatePartido(partido.id_partido, {
        marcador_local,
        marcador_visitante,
        estado: minuto < 90 ? "en juego" : "finalizado",
      });

      setPartidos((prev) =>
        prev.map((p) =>
          p.id_partido === partido.id_partido
            ? { ...p, marcador_local, marcador_visitante }
            : p
        )
      );

      if (minuto >= 90) {
        clearInterval(intervalo);
        alert(`¡Partido finalizado! Resultado: ${marcador_local} - ${marcador_visitante}`);
        setSimulando(false);
      }
    }, 1000);
  };

  const moverPelota = (equipo) => {
    // Mueve la pelota hacia el área del equipo que anotó
    const nuevaPosicion =
      equipo === "local"
        ? { top: "30%", left: "20%" } // Área local
        : { top: "30%", left: "80%" }; // Área visitante
    setPelotaPosicion(nuevaPosicion);

    // Devuelve la pelota al centro después de unos segundos
    setTimeout(() => setPelotaPosicion({ top: "50%", left: "50%" }), 2000);
  };

  return (
    <div>
      <h2>Partidos</h2>
      <div className="cancha">
        <div className="linea-central"></div>
        <div className="area-penalti-izquierda"></div>
        <div className="area-penalti-derecha"></div>
        <div className="punto-penalti-izquierda"></div>
        <div className="punto-penalti-derecha"></div>
        <div className="circulo-central"></div>
        <div
          className="pelota"
          style={{ top: pelotaPosicion.top, left: pelotaPosicion.left }}
        ></div>
      </div>

      <div>
        {partidos.length === 0 ? (
          <p>No hay partidos disponibles para simular.</p>
        ) : (
          partidos.map((partido) => (
            // Validación de datos antes de renderizar
            partido.equipo_local && partido.equipo_visitante ? (
              <div key={partido.id_partido}> {/* Usamos id_partido como clave */}
                <h3>
                  {partido.equipo_local} vs {partido.equipo_visitante}
                </h3>
                <p>
                  Fecha: {new Date(partido.fecha).toLocaleString()} {/* Formatear la fecha */}
                </p>
                <button
                  onClick={() => simularPartido(partido)}
                  disabled={simulando || partido.estado === "finalizado"}
                >
                  {simulando ? "Simulando..." : "Iniciar Simulación"}
                </button>
              </div>
            ) : (
              <p key={partido.id_partido}>Datos incompletos para el partido {partido.id_partido}</p>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default PartidoSimulacion;
