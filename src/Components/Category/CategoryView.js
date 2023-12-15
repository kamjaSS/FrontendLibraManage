import React, { useState, useEffect } from 'react';
import api from '../../api';
import PopupDeleteCateg from './PopupDeleteCateg';
import PopUpMessage from '../PopUpInfo/PopUpMessage';
import Swal from 'sweetalert2';

const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [fromCategories, setFormCategories] = useState({
    nombre: '',
  });

  const fetchCategories = async () => {
    const response = await api.get('/all_categories/');
    setCategories(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_categories/',
        {
          headers: { 'Authorization': `Bearer ${fetchToken()}` }
        });
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChangeCategories = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormCategories({ ...fromCategories, [event.target.name]: value });
  };

  const handleSubmitCategories = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", fromCategories);
    const response = await api.post('/new_category/', fromCategories);
    if(response.status === 200){
      Swal.fire({title: "Registro Realizado", text: "Se realizó el registro exitosamente",icon: "success"});
    } else {
      Swal.fire({title: "Error", text: "No se pudo realizar el registro",icon: "error"});
    }
    fetchCategories();
    setFormCategories({
      nombre: ''
    });
  };

  return (
    <div className='container'>
      <div className='card my-5 p-5' style={{ backgroundColor: '#EFEFEF', borderRadius: '25px' }}>
        <h2 className='card-title text-center'><strong>Registrar Categoría</strong></h2>
        <hr style={{ color: '#000' }} />
        <div className='card-body'>
          <form onSubmit={handleSubmitCategories}>
            <div className='form-group'>
              <label htmlFor='nombre' className='form-label'>Nombre de la categoría</label>
              <input
                type='text'
                className='form-control w-50 p-3'
                name='nombre'
                alue={fromCategories.nombre}
                onChange={handleInputChangeCategories}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Crear categoría
            </button>
          </form>
        </div>
      </div>
      <h2 className='text-center'><strong>Categorías Registradas</strong></h2>
      <table className='table table-striped table-bordered table-hover mt-4'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {console.log("Categories:", categories)}
          {categories.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <PopupDeleteCateg categoriaDel={categoria} onDelete={fetchCategories} />
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
    </div>
  );

};

export default CategoryView;