import { useState } from "react";
import "./App.css";
import ListTable from "./components/ListTable";
import { ModalForm } from "./components/ModalForm";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [buscarTermino, setBuscarTermino] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteData, setClienteData] = useState(null);

  const handleOpen = (mode, cliente) => {
    setIsOpen(true);
    setClienteData(cliente);
    setModalMode(mode);
  };

  const handleSubmit = async (nuevoCliente) => {
    if (modalMode === "add") {
      const response = axios.post(
        "http://localhost:3000/api/clientes",
        nuevoCliente
      );

      console.log("Adding new client", response.data);
    } else {
      const response = axios.put(
        `http://localhost:3000/api/clientes/${clienteData.id}`,
        nuevoCliente
      );
      console.log("Editing client", response.data);
    }
  };

  const handleSearchChange = (event) => {
    setBuscarTermino(event.target.value);
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setBuscarTermino} />

      <div className="flex justify-end mt-4 mr-10">
        <input
          type="text"
          placeholder="Buscar"
          className="input input-bordered w-24 md:w-auto mr-10"
          value={buscarTermino}
          onChange={handleSearchChange}
        />

        <button className="btn btn-primary" onClick={() => handleOpen("add")}>
          Añadir Cliente
        </button>
      </div>

      <ListTable
        handleOpen={handleOpen}
        searchTerm={buscarTermino}
        clientes={clientes}
      />

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
        clienteData={clienteData}
      />
    </>
  );
}

export default App;
