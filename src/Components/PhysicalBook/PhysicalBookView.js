import React, { useState,useEffect, useRef } from 'react';
import api from '../../api';

const PhysicalBook  = () => {

  const refForm = useRef();

  const [physicalBooks, setPhysicalBooks] = useState([]);
  const [formPhysicalBooks, setFormPhysicalBooks] = useState({
    titulo : '',
    descripcion : '',
    portada : '',
    ubicacion : '',
    estado : '',
    id_autor : 0,
    id_subcategoria : 0,
    id_categoria : 0,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [authors, setAuthors] = useState([]);

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
    console.log("Formulario de categorías:", formPhysicalBooks);
    //await api.post('/new_subcategory/', formPhysicalBooks);
    fetchPhysicalBooks();
    setFormPhysicalBooks({
        titulo : '',
        descripcion : '',
        portada : '',
        ubicacion : '',
        estado : '',
        id_autor : 0,
        id_subcategoria : 0,
        id_categoria : 0,
    });
    refForm.current.reset();
  };

  return (
  <div className='container'>
      <div className='card my-5 p-5' style={{backgroundColor: '#EFEFEF', borderRadius: '25px'}}>
      <h2 className='card-title text-center'><strong>Registrar libro Físico</strong></h2>
      <hr style={{color: '#000'}} />
      <div className='card-body'>
          <form ref={refForm} onSubmit={handleSubmitPhysicalBooks}>
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
              <td>{libro.portada}</td>
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