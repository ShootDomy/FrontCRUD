import axios from "axios";
import { useEffect, useState } from "react";

const ListTable = ({ handleOpen, searchTerm }) => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtroData = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.trabajo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // const clientes = [
  //   {
  //     id: 1,
  //     nombre: "Domenica Canizares",
  //     email: "correo@email.com",
  //     trabajo: "Developer",
  //     rate: "100",
  //     estado: true,
  //   },
  //   {
  //     id: 2,
  //     nombre: "Domenica1 Canizares",
  //     email: "correo1@email.com",
  //     trabajo: "Developer1",
  //     rate: "100",
  //     estado: true,
  //   },
  //   {
  //     id: 3,
  //     nombre: "Domenica2 Canizares",
  //     email: "correo2@email.com",
  //     trabajo: "Developer2",
  //     rate: "100",
  //     estado: false,
  //   },
  // ];

  return (
    <>
      {error && <div className="alert alert-error">Error: {error}</div>}

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Trabajo</th>
              <th>Rate</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody className="hover">
            {filtroData.map((cliente) => (
              <tr>
                <th>{cliente.id}</th>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.trabajo}</td>
                <td>{cliente.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      cliente.estado ? "btn-primary" : "btn-outline btn-primary"
                    }`}
                  >
                    {cliente.estado ? "Activo" : "Inactivo"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-accent btn-xs"
                    onClick={() => handleOpen("edit")}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button className="btn btn-error btn-xs">Eliminar</button>
                </td>
              </tr>
            ))}

            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTable;
