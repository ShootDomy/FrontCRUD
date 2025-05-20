import { useState } from "react";
import "./App.css";
import ListTable from "./components/ListTable";
import { ModalForm } from "./components/ModalForm";
import Navbar from "./components/Navbar";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const handleOpen = (mode) => {
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = (data) => {
    if (modalMode === "add") {
      // Add new client
      console.log("Adding new client", data);
    } else {
      // Edit client
      console.log("Editing client", data);
    }
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} />

      <div className="flex justify-end mt-4 mr-10">
        <input
          type="text"
          placeholder="Buscar"
          className="input input-bordered w-24 md:w-auto mr-10"
        />

        <button className="btn btn-primary" onClick={() => handleOpen("add")}>
          Añadir Cliente
        </button>
      </div>

      <ListTable handleOpen={handleOpen} />

      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        mode={modalMode}
      />
    </>
  );
}

export default App;
