export default function Navbar({ onOpen, onSearch, onLogout }) {
  return (
    <div className="navbar bg-base-100 p-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" aria-label="Ir a inicio" href="/">
          Clientes
        </a>
      </div>
      <div className="navbar-center">
        {onSearch && (
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="input input-bordered w-48"
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Buscar cliente"
          />
        )}
      </div>
      <div className="navbar-end gap-2">
        {onOpen && (
          <button
            className="btn btn-primary"
            onClick={onOpen}
            aria-label="Añadir cliente"
          >
            <span aria-hidden="true">➕</span> Añadir Cliente
          </button>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            aria-label="Menú de usuario"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Avatar usuario"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button
                onClick={onLogout}
                aria-label="Cerrar sesión"
                className="w-full text-left"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
