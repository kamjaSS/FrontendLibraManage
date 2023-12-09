import React, { useState,useEffect, useRef } from 'react';
import api from '../../api';

const DigitalBook  = () => {

  const refForm = useRef();

  const [digitalBooks, setDigitalBooks] = useState([]);
  const [formDigitalBooks, setFormDigitalBooks] = useState({
      titulo: '',
      portada : '',
      descripcion: '',
      link_Libro: '',
      precio: 0.0,
      id_autor: 0,
      id_subcategoria: 0,
      id_categoria: 0
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [authors, setAuthors] = useState([]);

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


  const fetchDigitalBooks = async () => {
    const response = await api.get('/all_digitalBooks/');
    setDigitalBooks(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_digitalBooks/');
        fetchCategories();
        fetchAuthors();
        fetchSubcategories();
        if (Array.isArray(response.data)) {
          setDigitalBooks(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching digitalBooks:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleInputChangeDigitalBooks = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormDigitalBooks({ ...formDigitalBooks, [event.target.name]: value });
  };

  const handleSubmitDigitalBooks = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", formDigitalBooks);
    //await api.post('/new_subcategory/', formDigitalBooks);
    fetchDigitalBooks();
    setFormDigitalBooks({
      titulo: '',
      portada : '',
      descripcion: '',
      link_Libro: '',
      precio: 0.0,
      id_autor: 0,
      id_subcategoria: 0,
      id_categoria: 0
    });
    refForm.current.reset();
  };

  return (
  <div className='container'>
      <div className='card my-5 p-5' style={{backgroundColor: '#EFEFEF', borderRadius: '25px'}}>
      <h2 className='card-title text-center'><strong>Registrar libro Digital</strong></h2>
      <hr style={{color: '#000'}} />
      <div className='card-body'>
          <form ref={refForm} onSubmit={handleSubmitDigitalBooks}>
          <div className='form-group' onChange={handleInputChangeDigitalBooks}>
            <div className='mb-3'>
              <label htmlFor='titulo' className='form-label'>Titulo del libro</label>
              <input 
              type='text'
              className='form-control w-50 p-3'
              name='titulo'
              alue={formDigitalBooks.titulo}
              onChange={handleInputChangeDigitalBooks}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='descripcion' className='form-label'>Descripcion del libro</label>
              <input 
              type='text'
              className='form-control w-100 p-3 h-full'
              name='descripcion'
              alue={formDigitalBooks.descripcion}
              onChange={handleInputChangeDigitalBooks}
              />
            </div> 

            <div className='mb-3'>
              <label htmlFor='portada' className='form-label'>Link de la Portada</label>
              <input 
              type='text'
              className='form-control w-full he p-3'
              name='portada'
              alue={formDigitalBooks.portada}
              onChange={handleInputChangeDigitalBooks}
              /> 
            </div>

            <div className='mb-3'>
              <label htmlFor='link_Libro' className='form-label'>Link del PDF</label>
              <input 
              type='text'
              className='form-control w-full he p-3'
              name='link_Libro'
              alue={formDigitalBooks.link_Libro}
              onChange={handleInputChangeDigitalBooks}
              /> 
            </div>

            <div className='mb-3'>
              <label htmlFor='precio' className='form-label'>Precio</label>
              <input 
              type='number'
              className='form-control w-50 p-3'
              name='precio'
              alue={formDigitalBooks.precio}
              onChange={handleInputChangeDigitalBooks}
              /> 
            </div>

            <div className='mb-3'>
              <label htmlFor='id_categoria' className='form-label'>Categoria</label>
              <select name='id_categoria' className='form-control w-25' onChange={handleInputChangeDigitalBooks}>
                <option selected="true" disabled="disabled">seleccione la categoria</option>
                {categories.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor='id_subcategoria' className='form-label'>Subcategoria</label>
              <select name='id_subcategoria' className='form-control w-25' onChange={handleInputChangeDigitalBooks}>
                <option selected="true" disabled="disabled">seleccione la subcategoria</option>
                {subcategories.map((subcategoria) => (
                  <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor='id_autor' className='form-label'>Autor</label>
              <select name='id_autor' className='form-control w-25' onChange={handleInputChangeDigitalBooks}>
                <option selected="true" disabled="disabled">seleccione el autor</option>
                {authors.map((autor) => (
                  <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                ))}
              </select>
            </div>

          </div>
          <button type='submit' className='btn btn-primary mt-3'>
              Crear Libro Digital
          </button>
          </form>
      </div>
      </div>

      <h2 className='text-center'><strong>Libros Digitales Registrados</strong></h2>
      <table className='table table-striped table-bordered table-hover mt-4'>
      <thead>
          <tr>
          <th>ID</th>
          <th>Titulo</th>
          <th>Portada</th>
          <th>Precio</th>
          <th>Autor</th>
          <th>Subcategoria</th>
          <th>Categoria</th>
          </tr>
      </thead>
      <tbody>
          {console.log("DigitalBooks:", digitalBooks)}
          {digitalBooks.map((libro) => (
          <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.portada}</td>
              <td>{libro.precio}</td>
              <td>{getAuthorName(libro.id_autor)}</td>
              <td>{getSubcategoryName(libro.id_subcategoria)}</td>
              <td>{getCategoryName(libro.id_categoria)}</td>
          </tr>
          ))}
      </tbody>
      </table>
  </div>
  );
  
};

export default DigitalBook;