import React, { useState, useEffect } from 'react';
import api from '../../api';
import PopupDeleteRol from './PopupDeleteRol';
import Swal from 'sweetalert2';

const RolView = () => {
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
    const response = await api.post('/rolcreate/', fromRoles);
    if (response.status === 200) {
      Swal.fire({ title: 'Rol creado', text: "Se realizó el registro del Rol exitosamente", icon: 'success' });
    } else {
      Swal.fire({ title: 'Error', text: "No se pudo realizar el registro del Rol", icon: 'error' });
    }
    fetchRoles();
    setFormRoles({
      nombre: ''
    });
  };

  return (
    <div className='container'>
      <div className='card my-5 p-5' style={{ backgroundColor: '#EFEFEF', borderRadius: '25px' }}>
        <h2 className='card-title text-center'><strong>Registrar Rol</strong></h2>
        <hr style={{ color: '#000' }} />
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {console.log("roles:", roles)}
          {roles.map((roles) => (
            <tr key={roles.id}>
              <td>{roles.id}</td>
              <td>{roles.nombre}</td>
              <td>
                <PopupDeleteRol rolDel={roles} onDelete={fetchRoles} />
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

export default RolView;