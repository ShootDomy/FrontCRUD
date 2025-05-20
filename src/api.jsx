import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getClientes = () => axios.get(`${API_URL}/clientes`);
export const addCliente = (cliente) =>
  axios.post(`${API_URL}/clientes`, cliente);
export const updateCliente = (id, cliente) =>
  axios.put(`${API_URL}/clientes/${id}`, cliente);
export const deleteCliente = (id) => axios.delete(`${API_URL}/clientes/${id}`);
