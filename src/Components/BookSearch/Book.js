import React, { useState, useEffect } from 'react'
import api from '../../api';
import { Card, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { fetchToken, RequireToken } from '../Auth.js';
import 'react-datepicker/dist/react-datepicker.css';

export const Book = ({ book, autor, categoria, subcategoria}) => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [available, setAvailable] = useState(null);
  const [loanForm, setLoanFrom] = useState({
    fechaPrestamo : '',    
    id_usuario : 0,
    id_libroFisico : 0
  });
  const [idUsuario, setIdUsuario] = useState(-1);

  const [buyForm, setBuyForm] = useState({
    id_usuario : 0,
    id_libroDigital : 0
  });
  
  const buyBook = async() => {
    await getUserId();
    buyForm.id_libroDigital = book.id;
    buyForm.id_usuario = idUsuario;
    if (idUsuario === -1) {
      alert('Debe iniciar sesión para comprar un libro');
      return;
    }
    console.log(buyForm);
    api.post('/new_buyBook/', buyForm);
    alert('Libro comprado');
    setBuyForm({
      id_usuario : 0,
      id_libroDigital : 0
    });
  }

  const loanBook = async () => {
    if (selectedDate === '') {
      alert('Seleccione una fecha');
    } else {
      await getUserId();
      loanForm.fechaPrestamo = selectedDate;
      loanForm.id_libroFisico = book.id;
      loanForm.id_usuario = idUsuario;
      if (idUsuario === -1) {
        alert('Debe iniciar sesión para reservar un libro');
        return;
      }
      console.log(loanForm);
      api.post('/new_loan/', loanForm);
      alert('Libro reservado');
      setAvailable(0);//no aparece nada
      setSelectedDate('')
      setLoanFrom({
        fechaPrestamo : '',    
        id_usuario : 0,
        id_libroFisico : 0
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getUserId();
    };

    fetchData();
  }, []);

  const getUserId = async () => {
    const token = await fetchToken();
    const response = await api.get(`/id_userToken/${token}`);
    await setIdUsuario(await response.data);
  }

  const validateLoanDate = async (date) => {

    const response = await api.get(`/check_availability/${book.id}/${date}`);

    if (response.data.message === undefined) {
      setAvailable(1);//no esta disponible
    } else {  
      setAvailable(2);//Esta disponible
      setSelectedDate(date);
    }
  }


  return (
    <div className="d-flex justify-content-around">
      <Col className='pt-3' md={2}> 
        <Link to='/books' className='btn black'>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
          </svg>
          Regresar
        </Link>
      </Col>
      <Col md={7} className='py-4'>
          <div className='tarjeta-libro'>
            <Card className='mt-3' style={{backgroundColor: '#386FDB'}}>
              <Card.Header className='text-center titulo-tarjeta'> <samp style={{color: '#fff', fontFamily: 'Caslon'}}>{book.titulo}</samp> </Card.Header>
            </Card>
            <div className="d-flex book-container tarjeta-libro mx-3">
              <Card style={{ flex: 1, minWidth: '300px'}}>
                <Card.Img style={{ width: '100%', height: 'auto' , maxHeight : '500px'}} variant="top" src={book.portada} alt={book.titulo} />
              </Card>
              <Card style={{ flex: 3 , marginLeft: '5px'}}>
                <Card.Body className='tamaño-subtituloLetra'>
                  <Card.Title style={{backgroundColor: '#DB4638', borderRadius: '10px', paddingLeft: '6px' , color: '#ffff'}}><strong>Información del libro</strong></Card.Title>
                  <Card.Text>
                    Autor: <samp className='tamaño-letraTarjeta'>{autor}</samp> <br/>
                    Categoría: <samp className='tamaño-letraTarjeta'>{categoria}</samp> <br/>
                    Subcategoría: <samp className='tamaño-letraTarjeta'>{subcategoria}</samp>
                  </Card.Text>
                  {book.precio != null ? (
                    <Card.Text>Precio: <samp className='tamaño-letraTarjeta'>${book.precio.toFixed(2)}</samp></Card.Text>
                  ) : (
                    <Card.Text>Ubicación: <samp className='tamaño-letraTarjeta'>{book.ubicacion}</samp></Card.Text>
                  )}
                  <Card.Text>Descripción: <br/><span className='tamaño-descripcion'>{book.descripcion}</span></Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
      </Col>
      <Col className='d-flex' md={3}>
        <div className="d-flex align-items-center ml-4">
          {book.precio != null ? (
            <button className='btn btn-outline-success' onClick={buyBook}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart4" className='mr-2' viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
              </svg>
              Comprar Libro
            </button>
          ) : (
            <div>
              <div className="mb-4">
                <label className="">Fecha que desea realizar la Reservar</label>
                <input type="date" className="form-control" name="fechaReserva" id="fechaReserva" value={selectedDate} onChange={async (e) => validateLoanDate(e.target.value)}></input>
              </div>
              {available === 2 ? (
                <p style={{ color: 'green' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill" className='mr-2' viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  Disponible
                </p>
              ) : available === 1 ? (
                <p style={{ color: 'red' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-circle-fill" className='mr-2' viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                  </svg>
                  No disponible
                </p>
              ) : available === 0 || available === undefined || available === null ?(
                null
              ):(
                null
              )}
              <button className='btn btn-outline-warning' onClick={loanBook} disabled={available === 0 || available === null ||available === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-journal-bookmark-fill" className='mr-2' viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                </svg>
                Reservar Libro
              </button>
            </div>
          )}     
        </div>
      </Col>
    </div>
  );
}
