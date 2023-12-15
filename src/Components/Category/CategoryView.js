import React, { useState, useEffect } from 'react';
import api from '../../api';
import PopupDeleteCateg from './PopupDeleteCateg';
import EditCategory from './EditCategory';
import { fetchToken, RequireToken } from '../Auth.js';
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
        const response = await api.get('/all_categories/');
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
  const fetchCategoryEdit = async (id) => {
    const response = await api.get(`/all_categories/${id}`,
        {
            headers: { 'Authorization': `Bearer ${fetchToken()}` }
        });
    setCategories(response.data);
}

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
                  <PopupDeleteCateg categoriaDel={categoria} onDelete={fetchCategories}/>
                  <EditCategory categoryEdit={categoria} onEdit={fetchCategoryEdit}/>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default CategoryView;