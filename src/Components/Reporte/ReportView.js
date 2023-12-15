import React, { useState, useEffect } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css'

const ReportView = () => {
  const [reportData, setReportData] = useState([]);
  const [userData, setUserData] = useState([]);

  const getUserName = (userId) =>{
    const user = userData.find((user) => user.id === userId);
    return user ? user.nombre : 'No existe';
}

const fetchUser = async () => {
  const reponse = await api.get("/all_users/");
  setUserData(reponse.data);
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/report/');
        fetchUser();
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setReportData(response.data);
          console.log(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleDownload = async (format) => {
    try {
      let endpoint;
      let fileExtension;
      
      // Determina el endpoint y la extensión según el formato
      switch (format) {
        case 'csv':
          endpoint = '/report/download-csv-all-users/';
          fileExtension = 'csv';
          break;
        case 'excel':
          endpoint = '/report/download-xlsx-all-users/';
          fileExtension = 'xlsx';
          break;
        case 'pdf':
          endpoint = '/report/download-pdf-all-users/';
          fileExtension = 'pdf';
          break;
        default:
          console.error(`Formato de descarga no válido: ${format}`);
          return;
      }
  
      const response = await api.get(endpoint, { responseType: 'blob' });
  
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `report.${fileExtension}`;
  
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading report in ${format} format:`, error);
    }
  };
  
  

  return (
    <div className='container'>
      <h2 className='text-center'><strong>Informe</strong></h2>

      <div>
        <button type="button" class="btn btn-success m-2" onClick={() => handleDownload('csv')}>CSV</button>
        <button type="button" class="btn btn-success m-2" onClick={() => handleDownload('excel')}>EXCEL</button>
        <button type="button" class="btn btn-danger m-2" onClick={() => handleDownload('pdf')}>PDF</button>
      </div>

      <table className='table table-striped table-bordered table-hover mt-4'>
        <thead>
          <tr>
            <th>ID Usuario</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th># Lib. Prestados</th>
            <th># Lib. No Devueltos</th>
            <th># Lib. Comprados</th>
            {/* Agrega más columnas según la estructura de tus datos */}
          </tr>
        </thead>
        <tbody>
          {reportData.map(item => (
            <tr key={item.id}>
              <td>{item.id_usuario}</td>
              <td>{getUserName(item.id_usuario)}</td>
              <td>{item.fechaGeneracion}</td>
              <td>{item.numeroLibrosPrestados}</td>
              <td>{item.numeroLibrosNoDevueltos}</td>
              <td>{item.numeroComprasLibros}</td>
              {/* Agrega más celdas según la estructura de tus datos */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportView;