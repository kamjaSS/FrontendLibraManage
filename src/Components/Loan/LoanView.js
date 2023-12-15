import React, { useState, useEffect } from "react";
import api from "../../api";
import PopUpDeleteLoan from "./PopUpDeleteLoan";
import { decodeToken } from 'react-jwt';
import { fetchToken } from '../Auth';



const LoanView = () => {
    const [loanData, setLoanData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [roles, setRoles] = useState([]);

    const getNameRol = (rolId) => {
      const role = roles.find((rol) => rol.id === rolId);
      return role ? role.nombre : 'N/A';
    };
    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await api.get('/all_roles/',
            {
              headers: { 'Authorization': `Bearer ${fetchToken()}` }
            });
          if (response.status === 200) {
            setRoles(response.data);
          }
        } catch (error) {
          console.error("Error en la respuesta del servidor:", error);
        }
      };
      fetchRoles();
    }, []);
    const rolId = parseInt(decodeToken(localStorage.getItem('token')).role, 10);
    const rol_name = getNameRol(rolId);

    const getUserName = (userId) =>{
        const user = userData.find((user) => user.id === userId);
        return user ? user.nombre : 'No existe';
    }

    const getBookName = (bookId) =>{
        const book = bookData.find((book) => book.id === bookId);
        return book ? book.titulo : 'No existe';
    }

    const fetchLoan = async () => {
        const reponse = await api.get("/all_loans/");
        setLoanData(reponse.data);
    }

    const fetchUser = async () => {
        const reponse = await api.get("/all_users/");
        setUserData(reponse.data);
    }

    const fetchPhysicalBooks = async () => {
        const reponse = await api.get("/all_physicalBooks/");
        setBookData(reponse.data);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/all_loans/");
                fetchPhysicalBooks();
                fetchUser();
                if (Array.isArray(response.data)) {
                    setLoanData(response.data);
                    console.log(response.data);
                } else {
                    console.error(
                        "La respuesta de la API no es un array:",
                        response.data
                    );
                }
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Préstamos</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped table-bordered table-hover mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">ID Usuario</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Libro</th>
                                    <th scope="col">Fech. Prestamo</th>
                                    <th scope="col">Fech. Vencimiento</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log("prestamos:", loanData)}
                                {console.log("usuario:", userData)}
                                {console.log("libros:", bookData)}
                                {loanData.map((loan) => (
                                    <tr key={loan.id}>
                                        <td>{loan.id}</td>
                                        <td>{loan.id_usuario}</td>
                                        <td>{getUserName(loan.id_usuario)}</td>
                                        <td>{getBookName(loan.id_libroFisico)}</td>
                                        <td>{loan.fechaPrestamo}</td>
                                        <td>{loan.fechaVencimiento}</td>
                                        <td>{loan.devuelto === true ? 'Devuelto' : 'No Devuelto'}</td>
                                        {rol_name === 'Administrador' &&(
                                        <td>
                                            <PopUpDeleteLoan
                                                prestamoDel={loan}
                                                onDelete={fetchLoan}
                                            />

                                        </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoanView;
