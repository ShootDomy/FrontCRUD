# FrontCRUD

Interfaz web de gestión de clientes construida con React + Vite y TailwindCSS. Permite visualizar, buscar, editar, eliminar y exportar registros de clientes, además de gestionar su estado y detalles asociados.

## 🖥️ Vista previa

![Vista previa](./path-to-image.png) <!-- Reemplaza con el path correcto si subes la imagen al repo -->

## 🚀 Funcionalidades

- Visualización de lista de clientes con paginación.
- Búsqueda de clientes por nombre o correo electrónico.
- Filtrado por estado (Todos, Activo, Inactivo).
- Exportación de registros a Excel.
- Creación de nuevos clientes.
- Edición y eliminación de clientes existentes.
- Visualización de estados con etiquetas estilizadas.
- Botón flotante para añadir nuevos clientes.

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) – Para consumo de API
- [React Icons](https://react-icons.github.io/react-icons/) – Para íconos en botones

## 📦 Instalación

```bash
git clone https://github.com/ShootDomy/FrontCRUD.git
cd FrontCRUD
npm install
npm run dev
```

```graphql
src/
├── components/       # Componentes reutilizables (tabla, botones, formularios)
├── pages/            # Vistas principales (Dashboard, Crear, Editar)
├── services/         # Lógica para peticiones HTTP (API)
├── utils/            # Funciones auxiliares
├── App.jsx           # Enrutamiento general
└── main.jsx          # Punto de entrada principal
```

## 📤 Exportar Excel
La funcionalidad de exportación convierte la tabla de clientes en un archivo .xlsx utilizando una librería como xlsx (asegúrate de que esté instalada).

## 🧪 Por hacer
Validaciones más robustas en los formularios.

Manejo de errores en peticiones.

Notificaciones de éxito/error.

Filtro avanzado por roles, rate, etc.

Paginación dinámica desde backend.

## 👩‍💻 Autora
Doménica Cañizares
GitHub: @ShootDomy
Correo: canizaresdomenica4@gmail.com
LinkedIn: https://www.linkedin.com/in/domenica-vintimilla-24a735245/



<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->
