import React, { useState,useEffect } from 'react';
import api from '../../api';

const RolView  = () => {
    const [roles, setRoles] = useState([]);
    const [fromRoles, setFormRoles] = useState({
      nombre: '',
    });
 
  const fetchRoles = async () => {
    const response = await api.get('/all_roles/');
    setRoles(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_roles/');
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setRoles(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleInputChangeRoles = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormRoles({ ...fromRoles, [event.target.name]: value });
  };

  const handleSubmitRoles = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", fromRoles);
    await api.post('/rolcreate/', fromRoles);
    fetchRoles();
    setFormRoles({
      nombre: ''
    });
  };

  return (
  <div className='container'>
      <div className='card my-5 p-5' style={{backgroundColor: '#EFEFEF', borderRadius: '25px'}}>
      <h2 className='card-title text-center'><strong>Registrar Rol</strong></h2>
      <hr style={{color: '#000'}} />
      <div className='card-body'>
          <form onSubmit={handleSubmitRoles}>
          <div className='form-group'>
              <label htmlFor='nombre' className='form-label'>Nombre del rol</label>
              <input 
              type='text'
              className='form-control w-50 p-3'
              name='nombre'
              alue={fromRoles.nombre}
              onChange={handleInputChangeRoles}
              />
          </div>
          <button type='submit' className='btn btn-primary'>
              Crear Rol
          </button>
          </form>
      </div>
      </div>

      <h2 className='text-center'><strong>Roles Registrados</strong></h2>
      <table className='table table-striped table-bordered table-hover mt-4'>
      <thead>
          <tr>
          <th>ID</th>
          <th>Nombre</th>
          </tr>
      </thead>
      <tbody>
          {console.log("roles:", roles)}
          {roles.map((roles) => (
          <tr key={roles.id}>
              <td>{roles.id}</td>
              <td>{roles.nombre}</td>
          </tr>
          ))}
      </tbody>
      </table>
  </div>
  );
  
};

export default RolView;