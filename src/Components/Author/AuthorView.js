import React, { useState,useEffect } from 'react';
import api from '../../api';
import PopupDeleteAuthor from './PopupDeleteAuthor';

const AuthorView  = () => {
  const [authors, setAuthors] = useState([]);
  const [fromAuthors, setFormAuthors] = useState({
    nombre: '',
  });
 
  const fetchAuthors = async () => {
    const response = await api.get('/all_authors/');
    setAuthors(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_authors/');
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleInputChangeAuthors = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormAuthors({ ...fromAuthors, [event.target.name]: value });
  };

  const handleSubmitAuthors = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", fromAuthors);
    await api.post('/new_author/', fromAuthors);
    fetchAuthors();
    setFormAuthors({
      nombre: ''
    });
  };

  return (
  <div className='container'>
      <div className='card my-5 p-5' style={{backgroundColor: '#EFEFEF', borderRadius: '25px'}}>
      <h2 className='card-title text-center'><strong>Registrar Autor</strong></h2>
      <hr style={{color: '#000'}} />
      <div className='card-body'>
          <form onSubmit={handleSubmitAuthors}>
          <div className='form-group'>
              <label htmlFor='nombre' className='form-label'>Nombre del autor</label>
              <input 
              type='text'
              className='form-control w-75 p-3'
              name='nombre'
              alue={fromAuthors.nombre}
              onChange={handleInputChangeAuthors}
              />
          </div>
          <button type='submit' className='btn btn-primary'>
              Crear Autor
          </button>
          </form>
      </div>
      </div>

      <h2 className='text-center'><strong>Autores Registrados</strong></h2>
      <table className='table table-striped table-bordered table-hover mt-4'>
      <thead>
          <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Acciones</th>
          </tr>
      </thead>
      <tbody>
          {console.log("authors:", authors)}
          {authors.map((autores) => (
          <tr key={autores.id}>
              <td>{autores.id}</td>
              <td>{autores.nombre}</td>
              <td>
                  <PopupDeleteAuthor autorDel={autores} onDelete={fetchAuthors}/>
                <div className='btn btn-outline-warning icon-Acciones'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="1 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg>
                </div>
              </td>
          </tr>
          ))}
      </tbody>
      </table>
  </div>
  );
  
};

export default AuthorView;