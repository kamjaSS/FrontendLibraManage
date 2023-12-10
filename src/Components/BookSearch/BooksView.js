import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { fetchToken } from '../Auth.js';

const BooksView = () => {
  const [books, setBooks] = useState([]);


  const fetchBooks = async () => {
    const response = await api.get('/all_books_general/',
    {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setBooks(response.data);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all_books_general/',
          {
            headers: { Authorization: `Bearer ${fetchToken()}` },
          });
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("La respuesta de la API no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching physicalBooks:", error);
        if (error.response) {
          // La solicitud se realizó y el servidor respondió con un código de estado diferente de 2xx
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió ninguna respuesta
          console.error("No response received from server");
        } else {
          // Algo sucedió en la configuración de la solicitud que desencadenó un error
          console.error("Error setting up the request:", error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container ">
      <h2 className='text-center'>Libros</h2>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card style={{ cursor: 'pointer', position: 'relative' }}>
              <Card.Img
                  variant="top"
                  src={book.portada}
                  alt={book.titulo}
                  style={{ width: '100%', height: '350px', objectFit: 'contain' }}
                  onMouseEnter ={(e) => {
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.nextSibling.style.display = 'none';
                  }}
                />
                <div className="overlay">
                  <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>{book.titulo}</p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default BooksView;
