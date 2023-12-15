// PurchaseLoanUser.js

import React, { useState, useEffect } from 'react';
import api from '../../api';

const PurchaseLoanByUser = ({ userId }) => {
  const [userLoans, setUserLoans] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [PhysicalBookData, setPhysicalBookData] = useState([]);

  const getBookName = (bookId) => {
    const book = PhysicalBookData.find((book) => book.id === bookId);
    return book ? book.titulo : 'No existe';
  }

  const getBookImage = (bookId) => {
    const book = PhysicalBookData.find((book) => book.id === bookId);
    return book ? book.portada : 'No existe';
  }

  const fetchPhysicalBooks = async () => {
    const reponse = await api.get("/all_physicalBooks/");
    setPhysicalBookData(reponse.data);
  }

  useEffect(() => {
    const fetchUserLoans = async () => {
      console.log("userId:", userId);
      try {
        const response = await api.get(`/all_loans_by_user/${userId}`);
        fetchPhysicalBooks();
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setUserLoans(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    /*     const fetchUserPurchases = async () => {
          try {
            const response = await api.get(`/user_purchases/${userId}`);
            setUserPurchases(response.data);
          } catch (error) {
            console.error('Error fetching user purchases:', error);
          }
        }; */

    fetchUserLoans();
    //fetchUserPurchases();
  }, [userId]);

  return (
    <div className='container'>
      <h2 className='text-center'>Préstamos del Usuario</h2>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped table-bordered table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Libro</th>
                <th scope="col">Portada</th>
                <th scope="col">Fech. Prestamo</th>
                <th scope="col">Fech. Devolución</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody>
              {userLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{getBookName(loan.id_libroFisico)}</td>
                  <td>{getBookImage(loan.id_libroFisico) && (
                    <img
                      src={getBookImage(loan.id_libroFisico)} // Asegúrate de que el valor de libro.portada sea la URL de la imagen
                      alt={`Portada de ${getBookName(loan.id_libroFisico)}`}
                      style={{ maxWidth: '100px', maxHeight: '100px' }} // Ajusta el tamaño según sea necesario
                    />
                  )} </td>
                  <td>{loan.fechaPrestamo}</td>
                  <td>{loan.fechaVencimiento}</td>
                  <td>{loan.devuelto === true ? 'Devuelto' : 'No Devuelto'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*       <h2>Compras del Usuario</h2>
      <ul>
        {userPurchases.map((purchase) => (
          <li key={purchase.id}>{purchase.bookTitle}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default PurchaseLoanByUser;
