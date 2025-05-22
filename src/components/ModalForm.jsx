import React, { useEffect, useState } from "react";
import { REGEX_EMAIL } from "../utils/Constants";
import { validateEmail } from "../utils/HelperFunctions";

export const ModalForm = ({ isOpen, onClose, onSubmit, mode, clienteData }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [rate, setRate] = useState("");
  const [estado, setEstado] = useState(true);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleEstadoChange = (e) => {
    setEstado(e.target.value === "Activo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !email || !trabajo || !rate) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("El email no es válido.");
      return;
    }
    if (Number(rate) < 0) {
      setFormError("El rate debe ser mayor o igual a 0.");
      return;
    }
    setFormError("");
    setSubmitting(true);
    try {
      const data = {
        nombre,
        email,
        trabajo,
        rate: Number(rate),
        estado,
      };
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormError("Error al enviar el formulario.");
    } finally {
      setSubmitting(false);
    }
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
    setFormError("");
  }, [mode, clienteData, isOpen]);

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen}
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box relative transition-all duration-300">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Cerrar"
        >
          <span aria-hidden="true">❌</span>
        </button>
        {/* Título */}
        <h3
          id="modal-title"
          className="font-bold text-2xl text-center py-4 mb-2"
        >
          {mode === "add" ? "Añadir Cliente" : "Editar Cliente"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="alert alert-error mb-2">{formError}</div>
          )}
          <div>
            <label htmlFor="nombre" className="block font-semibold mb-1">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className={`input input-bordered w-full ${
                formError && !nombre ? "input-error" : ""
              }`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-label="Nombre"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`input input-bordered w-full ${
                formError && !email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="trabajo" className="block font-semibold mb-1">
              Trabajo
            </label>
            <input
              id="trabajo"
              type="text"
              className={`input input-bordered w-full ${
                formError && !trabajo ? "input-error" : ""
              }`}
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
              aria-label="Trabajo"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="rate" className="block font-semibold mb-1">
                Rate
              </label>
              <input
                id="rate"
                type="number"
                className={`input input-bordered w-full ${
                  formError && (rate === "" || Number(rate) < 0)
                    ? "input-error"
                    : ""
                }`}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                aria-label="Rate"
                required
                min={0}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="estado" className="block font-semibold mb-1">
                Estado
              </label>
              <select
                id="estado"
                value={estado ? "Activo" : "Inactivo"}
                className="select select-bordered w-full"
                onChange={handleEstadoChange}
                aria-label="Estado"
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancelar
            </button>
            <button
              className={`btn btn-success flex items-center gap-2 ${
                submitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Guardando...
                </>
              ) : mode === "add" ? (
                <>
                  <span aria-hidden="true">➕</span> Crear
                </>
              ) : (
                <>
                  <span aria-hidden="true">✏️</span> Editar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};
