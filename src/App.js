import React, { useState, useEffect } from 'react';
import MainView from './Components/Main/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/ESTUDIO 2023/2023-2/Sotware II/proyecto/libraManage - Frontend/FrontendLibraManage/src/index.css';
import { BrowserRouter, Outlet, Routes, Route, Link } from 'react-router-dom';
import PhysicalBook from './Components/PhysicalBook/PhysicalBookView';
import CategoryView from './Components/Category/CategoryView';
import SubCategoryView from './Components/SubCategory/SubCategoryView';
import AuthorView from './Components/Author/AuthorView';
import DigitalBook from './Components/DigitalBook/DigitalBookView';
import RolView from './Components/Rol/RolView';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import UserView from './Components/User/UserView';
import ReportView from './Components/Reporte/ReportView.js';
import FineView from './Components/Fine/FineView.js';
import { RequireToken, fetchToken } from './Components/Auth.js';
import BooksView from './Components/BookSearch/BooksView.js';
import EditUser from './Components/User/EditUser.js';
import api from './api.js';

const App = () => {
  const [roles, setRoles] = useState([]);
  const getNameRol = (rolId) => {
    const role = roles.find((rol) => rol.id === rolId);
    return role ? role.nombre : 'N/A';
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/rol/Administrador',
          {
            headers: { 'Authorization': `Bearer ${fetchToken()}` }
          });
        if (response.status === 200) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error("Error en la respuesta del servidor:", error);
      }
    };
    fetchRoles();
  }, []);



  return (

    <div className='d-flex flex-column min-vh-100 fondo-navLibreria'>

      <nav className=" navbar navbar-expand-lg col mt-0">
        <div className="container-fluid">

          <Link to='/' className='navbar-brand titulo-empresa'>
            <img src="data:image/png;base64,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"
              class="me-2 mr-2"
              height="65"
              alt="Libramanage Logo"
              loading="lazy"
            ></img>
            <strong>LibraManage</strong>
          </Link>
        </div>

        <div className="d-flex align-items-center titulo-empresa">

          <div className="dropdown mx-2">
            <button className="btn outlineNav black dropdown-toggle" type="button" id="gestionLibreria" data-bs-toggle="dropdown" aria-expanded="false">
              Gestion Libreria
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><Link to='/report' className="dropdown-item">Informe</Link></li>
              <li><Link to='/multas' className="dropdown-item">Multas</Link></li>
            </ul>
          </div>
          {roles.nombre === 'Administrador' && (
            <div className="dropdown">
              <button className="btn outlineNav black dropdown-toggle" type="button" id="gestionUsuarios" data-bs-toggle="dropdown" aria-expanded="false">
                Gestion Usuarios
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link to='/user' className="dropdown-item" >Usuarios</Link></li>
                <li><a className="dropdown-item" href="#">Roles</a></li>
              </ul>
            </div>
          )}
          <div className="dropdown">
            <button className="btn outlineNav black dropdown-toggle" type="button" id="gestionLibros" data-bs-toggle="dropdown" aria-expanded="false">
              Gestion Libros
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

              <li><Link to='/librosFisicos' className="dropdown-item">Libros Físicos</Link></li>
              <li><Link to='/librosDigitales' className="dropdown-item">Libros Digitales</Link></li>

            </ul>
          </div>
          <div className="dropdown">
            <button className="btn outlineNav black dropdown-toggle" type="button" id="gestionEntidades" data-bs-toggle="dropdown" aria-expanded="false">
              Gestion Entidades
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><Link to='/category' className="dropdown-item">Categorias</Link></li>
              <li><Link to='/subCategory' className="dropdown-item">Subcategorias</Link></li>
              <li><Link to='/author' className="dropdown-item">Autores</Link></li>
            </ul>
          </div>
          {localStorage.getItem('token') ? (
            <a href='/books' type='button' className="btn outlineNav black mt-2 mx-2"
              onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Cerrar sesión</a>
          ) : (
            <>
              <a href='/login' type='button' className="btn outlineNav black mt-2 mx-2">Iniciar Sesión</a>
              <Link to='/register' type='button' className="btn outlineNav black mt-2 mx-2">Registrarse</Link>
            </>
          )}

        </div>

      </nav>

      <div className="container-fluid mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Buscar Libro" aria-label="Buscar Libro" aria-describedby="button-addon2" />
              <div className='btn btn-outline-primary icon-Acciones'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a7.5 7.5 0 1 0-1.397-1.398l-2.03-2.029a5.5 5.5 0 1 1 1.398 1.398l2.029 2.029z" />
                  <path fill-rule="evenodd" d="M2.5 7a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zm9-1a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <body className='letra-proyecto'>
        <Routes>
          <Route path='/' element={<MainView />} />
          <Route path="/librosFisicos" element={<PhysicalBook />} />
          <Route path="/category" element={<CategoryView />} />
          <Route path="/subCategory" element={<SubCategoryView />} />
          <Route path="/author" element={<AuthorView />} />
          <Route path="/rol" element={<RolView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/register" element={<Register />} />
          <Route path='/multas' element={<FineView />} />

          <Route
            path="/librosDigitales"
            element={
              <RequireToken>
                <DigitalBook />
              </RequireToken>
            }
          />

          <Route
            path="/report"
            element={
              <RequireToken>
                <ReportView />
              </RequireToken>
            }
          />

          <Route
            path="/user"
            element={
              <RequireToken>
                <UserView />
              </RequireToken>
            }
          />
        </Routes>

      </body>

      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3" style={{ backgroundColor: '#DECDAC' }}>
          © 2023 LibraManage
        </div>
      </footer>


    </div>



  );
}

export default App;
