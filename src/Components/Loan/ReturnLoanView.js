import React, {useState, useEffect} from "react";
import api from "../../api";
import PopUpReturnLoan from "./PopUpReturnLoan";


const ReturnLoanView = () => {
    const [loanData, setLoanData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);

    const getUserName = (userId) =>{
        const user = userData.find((user) => user.id === userId);
        return user ? user.nombre : 'No existe';
    }

    const getBookName = (bookId) =>{
        const book = bookData.find((book) => book.id === bookId);
        return book ? book.titulo : 'No existe';
    }


    const fetch = async () => {
        const reponse = await api.get("/all_loans_not_returned/");
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
                const response = await api.get("/all_loans_not_returned/");
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
                <h1 className="title text-center color-black">Préstamos no devueltos</h1>
                <table className="table table-striped table-bordered table-hover mt-4">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Libro</th>
                        <th>ID Usuario</th>
                        <th>Usuario</th>
                        <th>Fecha de préstamo</th>
                        <th>Fecha de devolución</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loanData.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>{getBookName(loan.id_libroFisico)}</td>
                            <td>{loan.id_usuario}</td>
                            <td>{getUserName(loan.id_usuario)}</td>
                            <td>{loan.fechaPrestamo}</td>
                            <td>{loan.fechaVencimiento}</td>
                            <td>{loan.devuelto === true ? 'Devuelto' : 'No Devuelto'}</td>
                            <td>
                                <PopUpReturnLoan prestamoReturn={loan} onReturn={fetch} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReturnLoanView;