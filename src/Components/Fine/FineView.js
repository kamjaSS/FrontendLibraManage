import React, { useState, useEffect } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css'
import PopUpForgivenFine from './PopUpForgivenFine';
import PopUpPayFine from './PopUpPayFine';
import PopUpDeleteFine from './PopUpDeleteFine';

const FineView = () => {
    const [fineData, setFineData] = useState([]);

    const fetch = async () => {
        const response = await api.get('/all_finee/');
        setFineData(response.data);
    };

    const actualizarMultas = async () => {
       await api.post('/add_fine_automatically/')
       fetch()
    }
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get('/all_finee/');
            console.log(Array.isArray(response.data));
            if (Array.isArray(response.data)) {
            setFineData(response.data);
            } else {
            console.error("La respuesta de la API no es un array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
        };
    
        fetchData();
    }, []);


    return (
        <div className='container'>
        <h2 className='text-center'><strong>Multas</strong></h2>

        <button className='btn btn-success' onClick={actualizarMultas}>Actualizar Multas</button>
  
        <table className='table table-striped table-bordered table-hover mt-4'>
          <thead>
            <tr>
              <th>id</th>
              <th>Fecha Pago</th>
              <th>Valor Deuda</th>
              <th>Estado</th>
              <th>ID Prestamo</th>
              <th>Acciones</th>
              {/* Agrega más columnas según la estructura de tus datos */}
            </tr>
          </thead>
          <tbody>
            {console.log("multas:", fineData)}
            {fineData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.fechaDePago}</td>
                <td>{item.valorDeuda}</td>
                <td>{item.estadoMulta === 0 ? 'Pendiente' : item.estadoMulta === 1 ? 'Pagada' : 'Perdonada' }</td>
                <td>{item.id_prestamo}</td>
                <td>
                    <PopUpPayFine multaPay={item} onPay={fetch} />
                    <PopUpForgivenFine multaForgiven={item} onForgiven={fetch} />
                    <PopUpDeleteFine multaDel={item} onDelete={fetch} />

                </td>
                {/* Agrega más celdas según la estructura de tus datos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

}

export default FineView;