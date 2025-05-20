import { useEffect, useState } from "react";
import "./App.css";
import ListTable from "./components/ListTable";
import { ModalForm } from "./components/ModalForm";
import Navbar from "./components/Navbar";
import { addCliente, deleteCliente, getClientes, updateCliente } from "./api";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [buscarTermino, setBuscarTermino] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteData, setClienteData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getClientes()
      .then((res) => setClientes(res.data))
      .catch(() => setError("No se pudieron cargar los clientes"))
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = (mode, cliente) => {
    setIsOpen(true);
    setClienteData(cliente);
    setModalMode(mode);
  };

  const handleSubmit = async (nuevoCliente) => {
    try {
      if (modalMode === "add") {
        const response = await addCliente(nuevoCliente);
        setClientes((prevClientes) => [...prevClientes, response.data]);
        setSuccess("Cliente añadido correctamente");
      } else {
        const response = await updateCliente(clienteData.id, nuevoCliente);
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === clienteData.id ? response.data : cliente
          )
        );
        setSuccess("Cliente editado correctamente");
      }
      setIsOpen(false);
    } catch {
      setError("Ocurrió un error al guardar el cliente");
    }
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    if (!cliente) return false;
    return (
      cliente.nombre?.toLowerCase().includes(buscarTermino.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(buscarTermino.toLowerCase()) ||
      cliente.trabajo?.toLowerCase().includes(buscarTermino.toLowerCase())
    );
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de eliminar este cliente?");
    if (confirmed) {
      await deleteCliente(id).catch(() => setError("No se elimino al cliente"));
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id !== id)
      );
      setSuccess("Cliente eliminado correctamente");
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setClienteData(null);
  };

  return (
    <>
      {error && <div className="alert alert-error">Error: {error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Navbar onOpen={() => handleOpen("add")} onSearch={setBuscarTermino} />

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          handleOpen={handleOpen}
          clientes={clientesFiltrados}
          onDelete={handleDelete}
        />
      )}

      <ModalForm
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        clienteData={clienteData}
      />
    </>
  );
}

export default App;
