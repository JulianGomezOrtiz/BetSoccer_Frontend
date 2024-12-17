import axios from "axios";

const API_URL = "http://localhost:3001/api"; 

export const getPartidos = async () => {
  return await axios.get(`${API_URL}/partidos`);
};

export const updatePartido = async (id, data) => {
  return await axios.put(`${API_URL}/partidos/${id}`, data);
};

export const getUsuarios = async () => {
  return await axios.get(`${API_URL}/usuarios`);
};

export const postApuesta = async (apuesta) => {
  return await axios.post(`${API_URL}/apuestas`, apuesta);
};
