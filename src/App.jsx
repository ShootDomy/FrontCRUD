import { useEffect, useState } from "react";
import "./App.css";
import ListTable from "./components/ListTable";
import { ModalForm } from "./components/ModalForm";
import Navbar from "./components/Navbar";
import { addCliente, deleteCliente, getClientes, updateCliente } from "./api";
import toast, { Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

function App() {
  const [user, setUser] = useState({ nombre: "Demo User" });

  // CRUD y UI
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [buscarTermino, setBuscarTermino] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteData, setClienteData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(null);

  // Paginación y filtros
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  // Ordenamiento
  const [sortBy, setSortBy] = useState("nombre");
  const [sortDirection, setSortDirection] = useState("asc");

  // Modal de confirmación para eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  useEffect(() => {
    getClientes()
      .then((res) => setClientes(res.data))
      .catch(() => toast.error("No se pudieron cargar los clientes"))
      .finally(() => setLoading(false));
  }, []);

  // Ordenar clientes
  const ordenarClientes = (arr) => {
    return [...arr].sort((a, b) => {
      const aVal = a[sortBy]?.toString().toLowerCase() || "";
      const bVal = b[sortBy]?.toString().toLowerCase() || "";
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Filtrar y ordenar
  const clientesFiltrados = ordenarClientes(
    clientes.filter((cliente) => {
      if (!cliente) return false;
      const coincideBusqueda =
        cliente.nombre?.toLowerCase().includes(buscarTermino.toLowerCase()) ||
        cliente.email?.toLowerCase().includes(buscarTermino.toLowerCase()) ||
        cliente.trabajo?.toLowerCase().includes(buscarTermino.toLowerCase());
      const coincideEstado =
        estadoFiltro === "Todos" ||
        (estadoFiltro === "Activo" && cliente.estado) ||
        (estadoFiltro === "Inactivo" && !cliente.estado);
      return coincideBusqueda && coincideEstado;
    })
  );

  // Paginación
  const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina);
  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  useEffect(() => {
    if (pagina > totalPaginas) {
      setPagina(1);
    }
  }, [clientesFiltrados, totalPaginas, pagina]);

  // CRUD
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
        toast.success("Cliente añadido correctamente");
      } else {
        const response = await updateCliente(clienteData.id, nuevoCliente);
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente.id === clienteData.id ? response.data : cliente
          )
        );
        toast.success("Cliente editado correctamente");
      }
      setIsOpen(false);
    } catch {
      toast.error("Ocurrió un error al guardar el cliente");
    }
  };

  // Confirmación visual para eliminar
  const handleDeleteRequest = (cliente) => {
    setClienteAEliminar(cliente);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCliente(clienteAEliminar.id);
      setClientes((prevClientes) =>
        prevClientes.filter((c) => c.id !== clienteAEliminar.id)
      );
      toast.success("Cliente eliminado correctamente");
    } catch {
      toast.error("No se eliminó al cliente");
    } finally {
      setShowDeleteModal(false);
      setClienteAEliminar(null);
    }
  };

  // Exportar a CSV
  const handleExportarExcel = () => {
    // Convierte los datos filtrados a una hoja de Excel
    const ws = XLSX.utils.json_to_sheet(clientesFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Clientes");
    XLSX.writeFile(wb, "clientes.xlsx");
  };

  // Logout simulado
  const handleLogout = () => {
    setUser(null);
    toast("Sesión cerrada");
    // Aquí podrías redirigir a login
  };

  // Cambiar orden
  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDirection("asc");
    }
    setPagina(1);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setClienteData(null);
  };

  // Edición rápida y soporte para imágenes se implementan en ListTable y ModalForm

  return (
    <>
      <Toaster position="top-right" />
      <Navbar
        onOpen={() => handleOpen("add")}
        onSearch={setBuscarTermino}
        onLogout={handleLogout}
        user={user}
      />

      <div className="flex flex-wrap gap-4 items-center my-4">
        {/* Filtro por estado */}
        <select
          className="select select-bordered"
          value={estadoFiltro}
          onChange={(e) => {
            setEstadoFiltro(e.target.value);
            setPagina(1);
          }}
        >
          <option value="Todos">Todos</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        {/* Exportar */}
        <button className="btn btn-outline" onClick={handleExportarExcel}>
          Exportar Excel
        </button>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          handleOpen={handleOpen}
          clientes={clientesPaginados}
          onDelete={handleDeleteRequest}
          pagina={pagina}
          setPagina={setPagina}
          totalPaginas={totalPaginas}
          onSort={handleSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      )}

      <ModalForm
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        clienteData={clienteData}
        // Para soporte de imágenes, pasa props aquí
      />

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">¿Eliminar cliente?</h2>
            <p>
              ¿Estás seguro de eliminar a{" "}
              <span className="font-semibold">{clienteAEliminar?.nombre}</span>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-error" onClick={handleDeleteConfirm}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
