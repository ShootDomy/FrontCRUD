# FrontCRUD

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4-blueviolet?logo=vite)](https://vitejs.dev/)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Interfaz web de gestión de clientes construida con **React + Vite** y **TailwindCSS**. Permite visualizar, buscar, editar, eliminar y exportar registros de clientes, además de gestionar su estado y detalles asociados.

---

## 📑 Tabla de Contenidos

- [FrontCRUD](#frontcrud)
  - [📑 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🖥️ Vista previa](#️-vista-previa)
  - [🚀 Funcionalidades](#-funcionalidades)
  - [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
  - [📦 Instalación](#-instalación)
  - [🗂️ Estructura del proyecto](#️-estructura-del-proyecto)
  - [📤 Exportar a Excel](#-exportar-a-excel)
  - [🧪 Por hacer](#-por-hacer)
  - [👩‍💻 Autora](#-autora)

---

## 🖥️ Vista previa

![Vista previa](https://github.com/user-attachments/assets/3dd29381-5a4f-4cbd-882d-528a439e4126)

---

## 🚀 Funcionalidades

- Visualización de lista de clientes con paginación dinámica.
- Búsqueda de clientes por nombre, correo electrónico o trabajo.
- Filtro por estado (Todos, Activo, Inactivo).
- Exportación de registros a Excel (.xlsx).
- Creación, edición y eliminación de clientes.
- Confirmación visual antes de eliminar.
- Visualización de estados con etiquetas estilizadas.
- Notificaciones de éxito/error tipo toast.
- Botón destacado para añadir nuevos clientes.
- Responsive y accesible.

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) – Consumo de API
- [xlsx](https://www.npmjs.com/package/xlsx) – Exportar a Excel
- [react-hot-toast](https://react-hot-toast.com/) – Notificaciones
- [React Icons](https://react-icons.github.io/react-icons/) – Íconos en botones

---

## 📦 Instalación

```bash
git clone https://github.com/ShootDomy/FrontCRUD.git
cd FrontCRUD
npm install
npm run dev
```

---

## 🗂️ Estructura del proyecto

```plaintext
src/
├── components/       # Componentes reutilizables (tabla, botones, formularios)
├── pages/            # Vistas principales (Dashboard, Crear, Editar)
├── services/         # Lógica para peticiones HTTP (API)
├── utils/            # Funciones auxiliares
├── App.jsx           # Enrutamiento general
└── main.jsx          # Punto de entrada principal
```

---

## 📤 Exportar a Excel

La funcionalidad de exportación convierte la tabla de clientes en un archivo `.xlsx` utilizando la librería [xlsx](https://www.npmjs.com/package/xlsx).  
Asegúrate de tenerla instalada:

```bash
npm install xlsx
```

El botón **Exportar Excel** descargará los clientes filtrados en un archivo Excel.

---

## 🧪 Por hacer

- Validaciones más robustas en los formularios.
- Mejor manejo de errores en peticiones.
- Filtros avanzados por roles, rate, etc.
- Paginación dinámica desde backend.
- Soporte para imágenes de cliente.
- Autenticación real y gestión de usuarios.

---

## 👩‍💻 Autora

**Doménica Cañizares**

- GitHub: [@ShootDomy](https://github.com/ShootDomy)
- Correo: [canizaresdomenica4@gmail.com](canizaresdomenica4@gmail.com)
- LinkedIn:[domenica-vintimilla](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)

---

<!--
# React + Vite

Este template proporciona una configuración mínima para trabajar con React y Vite.
-->
