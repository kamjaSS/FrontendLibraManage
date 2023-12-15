import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { fetchToken } from '../Auth.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import Swal from 'sweetalert2';


const PhysicalBook = () => {

  const refForm = useRef();


  const [physicalBooks, setPhysicalBooks] = useState([]);
  const [formPhysicalBooks, setFormPhysicalBooks] = useState({
    titulo: '',
    descripcion: '',
    portada: '',
    ubicacion: '',
    estado: '',
    id_autor: 0,
    id_subcategoria: 0,
    id_categoria: 0,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);

  const getNameRol = (rolId) => {
    const role = roles.find((rol) => rol.id === rolId);
    return role ? role.nombre : 'N/A';
  };


  const getAuthorName = (authorId) => {
    const author = authors.find((autor) => autor.id === authorId);
    return author ? author.nombre : 'N/A';
  };

  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((subcategoria) => subcategoria.id === subcategoryId);
    return subcategory ? subcategory.nombre : 'N/A';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((categoria) => categoria.id === categoryId);
    return category ? category.nombre : 'N/A';
  };

  const fetchCategories = async () => {
    const response = await api.get('/all_categories/');
    setCategories(response.data);
  };

  const fetchAuthors = async () => {
    const response = await api.get('/all_authors/');
    setAuthors(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await api.get('/all_subcategories/');
    setSubcategories(response.data);
  };


  const fetchPhysicalBooks = async () => {
    const response = await api.get('/all_physicalBooks/');
    setPhysicalBooks(response.data);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/all_roles/',
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
  const userEmail = localStorage.getItem('correo')
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/get_user/${userEmail}`,
          {
            headers: { 'Authorization': `Bearer ${fetchToken()}` }
          });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error en la respuesta del servidor:", error);
      }
    }
    fetchUser();
  }, []);
  const name_rol = getNameRol(user?.id_rol);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_physicalBooks/');
        fetchCategories();
        fetchAuthors();
        fetchSubcategories();
        if (Array.isArray(response.data)) {
          setPhysicalBooks(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching physicalBooks:", error);

      }
    };

    fetchData();
  }, []);



  const handleInputChangePhysicalBooks = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormPhysicalBooks({ ...formPhysicalBooks, [event.target.name]: value });
  };

  const handleSubmitPhysicalBooks = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/register_physicalBooks/', formPhysicalBooks);
      if (response.status === 200) {
        Swal.fire({ title: "Registro Realizado", text: "Se realizó el registro del libro exitosamente", icon: "success" });
      } else {
        Swal.fire({ title: "Error", text: "No se pudo realizar el registro", icon: "error" });
      }
      fetchPhysicalBooks();
      setFormPhysicalBooks({
        titulo: '',
        descripcion: '',
        portada: '',
        ubicacion: '',
        estado: '',
        id_autor: 0,
        id_subcategoria: 0,
        id_categoria: 0,
      });
      refForm.current.reset();
    } catch (error) {
      console.error("Error registering physical book:", error);

    }
  };


  return (
    <div className="background-main">
      <div className="page-content">
        <br></br>
        <div className='container'>

          <div className='card my-5 p-5' style={{ backgroundColor: '#EFEFEF', borderRadius: '25px' }}>
            <h2 className='card-title text-center'><strong>Registrar libro Físico</strong></h2>
            <hr style={{ color: '#000' }} />
            <div className='card-body'>

              <form ref={refForm} onSubmit={handleSubmitPhysicalBooks} method='post'>
                <div className='form-group' onChange={handleInputChangePhysicalBooks}>
                  <div className='mb-3'>
                    <label htmlFor='titulo' className='form-label'>Titulo del libros</label>
                    <input
                      type='text'
                      className='form-control w-50 p-3'
                      name='titulo'
                      value={formPhysicalBooks.titulo}
                      onChange={handleInputChangePhysicalBooks}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='descripcion' className='form-label'>Descripcion del libros</label>
                    <input
                      type='text'
                      className='form-control w-100 p-3 h-full'
                      name='descripcion'
                      value={formPhysicalBooks.descripcion}
                      onChange={handleInputChangePhysicalBooks}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='portada' className='form-label'>Link de la Portada</label>
                    <input
                      type='text'
                      className='form-control w-full he p-3'
                      name='portada'
                      value={formPhysicalBooks.portada}
                      onChange={handleInputChangePhysicalBooks}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='ubicacion' className='form-label'>Ubicación</label>
                    <input
                      type='text'
                      className='form-control w-50 p-3'
                      name='ubicacion'
                      value={formPhysicalBooks.ubicacion}
                      onChange={handleInputChangePhysicalBooks}
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='estado' className='form-label'>Estado</label>
                    <select name='estado' className='form-control w-25' onChange={handleInputChangePhysicalBooks}>
                      <option selected="true" disabled="disabled">seleccione el estado</option>
                      <option value='Disponible' selected={formPhysicalBooks.estado === 'Disponible'}>Disponible</option>
                      <option value='No disponible' selected={formPhysicalBooks.estado === 'No disponible'}>No disponible</option>
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='id_categoria' className='form-label'>Categoria</label>
                    <select name='id_categoria' className='form-control w-25' onChange={handleInputChangePhysicalBooks}>
                      <option selected="true" disabled="disabled">seleccione la categoria</option>
                      {categories.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='id_subcategoria' className='form-label'>Subcategoria</label>
                    <select name='id_subcategoria' className='form-control w-25' onChange={handleInputChangePhysicalBooks}>
                      <option selected="true" disabled="disabled">seleccione la subcategoria</option>
                      {subcategories.map((subcategoria) => (
                        <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='id_autor' className='form-label'>Autor</label>
                    <select name='id_autor' className='form-control w-25' onChange={handleInputChangePhysicalBooks}>
                      <option selected="true" disabled="disabled">seleccione el autor</option>
                      {authors.map((autor) => (
                        <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='file' className='form-label'>Imagen portada</label>
                    <input
                      type='file'
                      className='form-control w-25'
                      name='file'
                      value={formPhysicalBooks.file}
                      onChange={handleInputChangePhysicalBooks}
                    />
                  </div>

                </div>
                <button type='submit' className='btn btn-primary mt-3'>
                  Crear libro Físico
                </button>
              </form>
            </div>
          </div>
          <br></br>

          <h2 className='text-center'><strong>Libros Físicos Registrados</strong></h2>
          <table className='table table-striped table-bordered table-hover mt-4'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Portada</th>
                <th>Descripcion</th>
                <th>Ubicacion</th>
                <th>Estado</th>
                <th>Autor</th>
                <th>Subcategoria</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>

              {physicalBooks.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.portada && (
                    <img
                      src={libro.portada} // Asegúrate de que el valor de libro.portada sea la URL de la imagen
                      alt={`Portada de ${libro.titulo}`}
                      style={{ maxWidth: '100px', maxHeight: '100px' }} // Ajusta el tamaño según sea necesario
                    />
                  )} </td>
                  <td>{libro.descripcion}</td>
                  <td>{libro.ubicacion}</td>
                  <td>{libro.estado}</td>
                  <td>{getAuthorName(libro.id_autor)}</td>
                  <td>{getSubcategoryName(libro.id_subcategoria)}</td>
                  <td>{getCategoryName(libro.id_categoria)}</td>
                  <td>

                    <div className='btn btn-outline-warning icon-Acciones'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="1 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </div>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
        </div>
      </div>
    </div>
  );

};

export default PhysicalBook;