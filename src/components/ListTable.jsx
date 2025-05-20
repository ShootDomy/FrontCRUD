const ClienteRow = ({ cliente, handleOpen, onDelete }) => (
  <tr>
    <td>{cliente.id}</td>
    <td>{cliente.nombre}</td>
    <td>{cliente.email}</td>
    <td>{cliente.trabajo}</td>
    <td>{cliente.rate}</td>
    <td>
      <span
        className={`badge ${
          cliente.estado ? "badge-primary" : "badge-outline badge-primary"
        }`}
      >
        {cliente.estado ? "Activo" : "Inactivo"}
      </span>
    </td>
    <td>
      <button
        className="btn btn-accent btn-xs mr-2"
        onClick={() => handleOpen("edit", cliente)}
        aria-label={`Editar cliente ${cliente.nombre}`}
      >
        ✏️ Editar
      </button>
      <button
        className="btn btn-error btn-xs"
        onClick={() => onDelete(cliente)}
        aria-label={`Eliminar cliente ${cliente.nombre}`}
      >
        🗑️ Eliminar
      </button>
    </td>
  </tr>
);

const ListTable = ({
  handleOpen,
  clientes,
  onDelete,
  pagina,
  setPagina,
  totalPaginas,
  onSort,
  sortBy,
  sortDirection,
}) => {
  const sortArrow = (col) => {
    if (sortBy !== col) return null;
    return sortDirection === "asc" ? " ▲" : " ▼";
  };

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("id")}
                >
                  ID{sortArrow("id")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("nombre")}
                >
                  Nombre{sortArrow("nombre")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("email")}
                >
                  Email{sortArrow("email")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("trabajo")}
                >
                  Trabajo{sortArrow("trabajo")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("rate")}
                >
                  Rate{sortArrow("rate")}
                </button>
              </th>
              <th>
                <button
                  className="btn btn-ghost btn-xs"
                  onClick={() => onSort("estado")}
                >
                  Estado{sortArrow("estado")}
                </button>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="hover">
            {clientes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay clientes para mostrar.
                </td>
              </tr>
            ) : (
              clientes.map((cliente) => (
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
        <div className="flex justify-center gap-4 my-4">
          <button
            className="btn btn-sm"
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
          >
            ⬅️ Anterior
          </button>
          <span className="font-semibold">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => setPagina((p) => (p < totalPaginas ? p + 1 : p))}
            disabled={pagina === totalPaginas || totalPaginas === 0}
          >
            Siguiente ➡️
          </button>
        </div>
      </div>
    </>
  );
};

export default ListTable;
