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

      <div className="navbar-end ">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
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
