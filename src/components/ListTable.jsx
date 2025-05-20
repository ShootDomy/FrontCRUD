import { useState } from "react";

const ClienteRow = ({ cliente, handleOpen, onDelete }) => (
  <tr>
    <th>{cliente.id}</th>
    <td>{cliente.nombre}</td>
    <td>{cliente.email}</td>
    <td>{cliente.trabajo}</td>
    <td>{cliente.rate}</td>
    <td>
      <span
        className={`badge rounded-full w-20 ${
          cliente.estado ? "badge-primary" : "badge-outline badge-primary"
        }`}
      >
        {cliente.estado ? "Activo" : "Inactivo"}
      </span>
    </td>
    <td>
      <button
        className="btn btn-accent btn-xs flex items-center gap-1 mr-2"
        onClick={() => handleOpen("edit", cliente)}
        aria-label={`Editar cliente ${cliente.nombre}`}
      >
        <span aria-hidden="true">✏️</span>
      </button>
      <button
        className="btn btn-error btn-xs flex items-center gap-1"
        onClick={() => onDelete(cliente.id)}
        aria-label={`Eliminar cliente ${cliente.nombre}`}
      >
        <span aria-hidden="true">🗑️</span>
      </button>
    </td>
  </tr>
);

const ListTable = ({ handleOpen, clientes, onDelete }) => {
  // const clientes = [
  //   {
  //     id: 1,
  //     nombre: "Domenica Canizares",
  //     email: "correo@email.com",
  //     trabajo: "Developer",
  //     rate: "100",
  //     estado: true,
  //   }
  // ];

  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const clientesPaginados = clientes.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Trabajo</th>
              <th scope="col">Rate</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="hover">
            {clientesPaginados.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay clientes para mostrar.
                </td>
              </tr>
            ) : (
              clientesPaginados.map((cliente) => (
                // Punto 6: Llave única
                <ClienteRow
                  key={cliente.id}
                  cliente={cliente}
                  handleOpen={handleOpen}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
        {/* Punto 12: Controles de paginación fuera de la tabla */}
        <div className="flex justify-center gap-4 my-4">
          <button
            className="btn btn-sm"
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
          >
            ⬅️ Anterior
          </button>
          <span>Página {pagina}</span>
          <button
            className="btn btn-sm"
            onClick={() =>
              setPagina((p) => (clientes.length > p * porPagina ? p + 1 : p))
            }
            disabled={clientes.length <= pagina * porPagina}
          >
            Siguiente ➡️
          </button>
        </div>
      </div>
    </>
  );
};

export default ListTable;
