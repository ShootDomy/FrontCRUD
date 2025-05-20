import React, { useEffect, useState } from "react";

export const ModalForm = ({ isOpen, onClose, onSubmit, mode, clienteData }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [rate, setRate] = useState("");
  const [estado, setEstado] = useState(true);
  // const [id, setId] = useState("");

  const handleEstadoChange = (e) => {
    setEstado(e.target.value === "Activo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clienteData = {
        nombre,
        email,
        trabajo,
        rate: Number(rate),
        estado: estado,
      };

      await onSubmit(clienteData);
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    onClose();
  };

  useEffect(() => {
    if (mode === "edit" && clienteData) {
      setNombre(clienteData.nombre);
      setEmail(clienteData.email);
      setTrabajo(clienteData.trabajo);
      setRate(clienteData.rate);
      setEstado(clienteData.estado);
    } else {
      setNombre("");
      setEmail("");
      setTrabajo("");
      setRate("");
      setEstado(true);
    }
  }, [mode, clienteData]);

  return (
    <>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        open={isOpen}
      >
        <div className="modal-box">
          <h3 className="font-bold text.lg py-4">
            {mode === "add" ? "Añadir Cliente" : "Editar Cliente"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Nombre
              <input
                type="text"
                className="grow"
                // placeholder="Ingrese el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                // placeholder="Ingrese el correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered my-4 flex items-center gap-2">
              Trabajo
              <input
                type="text"
                className="grow"
                // placeholder="Ingrese el trabajo"
                value={trabajo}
                onChange={(e) => setTrabajo(e.target.value)}
              />
            </label>
            <div className="flex mb-4 justify-between my-4">
              <label className="input input-bordered flex items-center gap-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  // placeholder="Ingrese el rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              <select
                value={estado ? "Activo" : "Inactivo"}
                className="select select-bordered w-full max-w-xs"
                onChange={handleEstadoChange}
              >
                {/* <option disabled={true}>Estado</option> */}
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <button className="btn btn-success">
              {mode === "add" ? "Crear" : "Editar"}
            </button>{" "}
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};
