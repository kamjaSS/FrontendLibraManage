import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from '../Auth.js';


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

  const fetchCategories = async () => {
    const response = await api.get('/all_categories/',
    {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setCategories(response.data);
  };

  const fetchAuthors = async () => {
    const response = await api.get('/all_authors/',
    {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setAuthors(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await api.get('/all_subcategories/',
    {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setSubcategories(response.data);
  };


  const fetchPhysicalBooks = async () => {
    const response = await api.get('/all_physicalBooks/',
    {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setPhysicalBooks(response.data);
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_physicalBooks/',
          {
            headers: { Authorization: `Bearer ${fetchToken()}` },
          });
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
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un código de estado diferente de 2xx
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió ninguna respuesta
          console.error("No response received from server");
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.error("Error setting up the request:", error.message);
        }
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

      //await api.post('/new_subcategory/', formPhysicalBooks);
      await api.post('/register_physicalBooks/', formPhysicalBooks);
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

  const navigate = useNavigate();
  const singOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  }


  return (
    <div className='container'>
      <div className='card my-5 p-5' style={{ backgroundColor: '#EFEFEF', borderRadius: '25px' }}>
        <h2 className='card-title text-center'><strong>Registrar libro Físico</strong></h2>
        <hr style={{ color: '#000' }} />
        <div className='card-body'>

          <div style={{ textAlign: 'right', alignItems: 'end', width: '100%', justifyContent: 'end' }}>
            <button className='btn btn-danger' onClick={singOut}>Cerrar Sesión</button>
          </div>
          <form ref={refForm} onSubmit={handleSubmitPhysicalBooks} method='post'>
            <div className='form-group' onChange={handleInputChangePhysicalBooks}>
              <div className='mb-3'>
                <label htmlFor='titulo' className='form-label'>Titulo del libros</label>
                <input
                  type='text'
                  className='form-control w-50 p-3'
                  name='titulo'
                  alue={formPhysicalBooks.titulo}
                  onChange={handleInputChangePhysicalBooks}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='descripcion' className='form-label'>Descripcion del libros</label>
                <input
                  type='text'
                  className='form-control w-100 p-3 h-full'
                  name='descripcion'
                  alue={formPhysicalBooks.descripcion}
                  onChange={handleInputChangePhysicalBooks}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='portada' className='form-label'>Link de la Portada</label>
                <input
                  type='text'
                  className='form-control w-full he p-3'
                  name='portada'
                  alue={formPhysicalBooks.portada}
                  onChange={handleInputChangePhysicalBooks}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='ubicacion' className='form-label'>Ubicación</label>
                <input
                  type='text'
                  className='form-control w-50 p-3'
                  name='ubicacion'
                  alue={formPhysicalBooks.ubicacion}
                  onChange={handleInputChangePhysicalBooks}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='estado' className='form-label'>Estado</label>
                <select name='estado' className='form-control w-25' onChange={handleInputChangePhysicalBooks}>
                  <option selected="true" disabled="disabled">seleccione el estado</option>
                  <option value='Disponible'>Disponible</option>
                  <option value='No disponible'>No disponible</option>
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

            </div>
            <button type='submit' className='btn btn-primary mt-3'>
              Crear libro Físico
            </button>
          </form>
        </div>
      </div>

      <h2 className='text-center'><strong>Libros Físicos Registrados</strong></h2>
      <table className='table table-striped table-bordered table-hover mt-4'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descripcion</th>
            <th>Portada</th>
            <th>Ubicacion</th>
            <th>Estado</th>
            <th>Autor</th>
            <th>Subcategoria</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {console.log("PhysicalBooks:", physicalBooks)}
          {physicalBooks.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.descripcion}</td>
              <td>{libro.portada && (
                <img
                  src={libro.portada} // Asegúrate de que el valor de libro.portada sea la URL de la imagen
                  alt={`Portada de ${libro.titulo}`}
                  style={{ maxWidth: '100px', maxHeight: '100px' }} // Ajusta el tamaño según sea necesario
                />
              )} </td>
              <td>{libro.ubicacion}</td>
              <td>{libro.estado}</td>
              <td>{libro.id_autor}</td>
              <td>{libro.id_subcategoria}</td>
              <td>{libro.id_categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default PhysicalBook;