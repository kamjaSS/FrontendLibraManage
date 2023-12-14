import React, { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';


const BooksView = ({setBook, setCategory, setSubcategory, setAuthor}) => {

  const refForm = useRef();

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filters, setFilters] = useState({
    categoria: '',
    subcategoria: '',
    titulo: '',
    autor: '',
  });

  const handleCategoryChange = (event) => {
    setFilters({ ...filters, categoria: event.target.value });
  };
  
  const handleSubcategoryChange = (event) => {
    setFilters({ ...filters, subcategoria: event.target.value });
  };
  
  const handleTitleChange = (event) => {
    setFilters({ ...filters, titulo: event.target.value });
  };
  
  const handleAuthorChange = (event) => {
    setFilters({ ...filters, autor: event.target.value });
  };

  const filterBooks = async () => {
    try {
      
      console.log(filters);
      const response = await api.get(`/search_book/?titulo=${filters.titulo}&categoria=${filters.categoria}&subcategoria=${filters.subcategoria}&autor=${filters.autor}`);
      console.log(response.data);
      // Verificar si la respuesta es un array antes de actualizar el estado
      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        console.error("La respuesta de la API no es un array:", response.data);
        // Puedes manejar este caso de acuerdo a tus necesidades
      }
      setFilters({
        categoria: '',
        subcategoria: '',
        titulo: '',
        autor: '',
      });
      refForm.current.querySelector('[name="id_categoria"]').selectedIndex = 0;
      refForm.current.querySelector('[name="id_subcategoria"]').selectedIndex = 0;
      refForm.current.reset();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchCategories = async () => {
    const response = await api.get('/all_categories/');
    setCategories(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await api.get('/all_subcategories/');
    setSubcategories(response.data);
  };

  const fetchAuthors = async () => {
    const response = await api.get('/all_authors/');
    setAuthors(response.data);
  };

  const getAuthorName = (authorId) => {
    const author = authors.find((autor) => autor.id === authorId);
    return author ? author.nombre : 'N/A';
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((categoria) => categoria.id === categoryId);
    return category ? category.nombre : 'N/A';
  };

  const getSubCategory = (SubcategoriaId) => {
    const subcategory = subcategories.find((Subcategoria) => Subcategoria.id === SubcategoriaId);
    return subcategory ? subcategory.nombre : 'N/A';
  };

  const Acciones = ({ book }) => {
    setBook(book);
    setCategory(getCategoryName(book.id_categoria));
    setSubcategory(getSubCategory(book.id_subcategoria));
    setAuthor(getAuthorName(book.id_autor));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/search_book/?titulo=${filters.titulo}&categoria=${filters.categoria}&subcategoria=${filters.subcategoria}&autor=${filters.autor}`);

        fetchCategories();
        fetchSubcategories();
        fetchAuthors();
        setBooks(response.data);

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
  }, [filters.autor, filters.categoria, filters.subcategoria, filters.titulo]);

  return (
    <div style={{ backgroundColor: '#EFEFEF'}}>
      <div className="container">
        <div ref={refForm} className='py-4'>
          <div className='row'>
            <div className='col-md-2 mx-2 mb-3'>
              <select name='id_categoria' className='form-control custom-select' onChange={handleCategoryChange}>
                <option selected="true" disabled="disabled">Categoría</option>
                {categories.map((categoria) => (
                  <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                ))}
              </select>
            </div>

            <div className='col-md-2 mx-2 mb-3'>
              <select name='id_subcategoria' className='form-control custom-select' onChange={handleSubcategoryChange}>
                <option selected="true" disabled="disabled">Subcategoría</option>
                {subcategories.map((subcategoria) => (
                  <option key={subcategoria.id} value={subcategoria.nombre}>{subcategoria.nombre}</option>
                ))}
              </select>
            </div>

            <div className='col-md-3 mb-3'>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por Titulo"
                  aria-label="Buscar por Titulo"
                  aria-describedby="basic-addon1"
                  onChange={handleTitleChange}
                  value={filters.titulo}
                />
              </div>
            </div>

            <div className='col-md-3 mb-3'>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por Autor"
                  aria-label="Buscar por Autor"
                  aria-describedby="basic-addon1"
                  onChange={handleAuthorChange}
                  value={filters.autor}
                />
              </div>
            </div>

              <div className='col-md-1 mb-3'>
                <button className='btn black' onClick={filterBooks} style={{ fontFamily: 'Caslon, serif' }}>
                  Limpiar
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-left ml-1" viewBox="0 1 13 13">
                    <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                  </svg>
                </button>
              </div>
            </div>
        </div>
        <h1 className='text-center'><strong>Catalogo de Libros</strong></h1>
        <hr />
        {books.length === 0 || !Array.isArray(books) ? (
          <h2 className="text-center mt-5">No se encontraron libros con las características proporcionadas.</h2>
        ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4 pb-5" >
          {books.map((book) => (
            <Col key={book.id}>
              <Link to={{pathname: "/book"}} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => Acciones({ book })}>
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
                <Card.Body>
                  <Card.Title className="p-2  text-white" style={{ backgroundColor: '#5B5247'}}>{book.titulo}</Card.Title>
                  <Card.Text className='ml-3 tamaño-descripcion'>Autor: <strong>{getAuthorName(book.id_autor)}</strong></Card.Text>
                </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        )}
      </div>
    </div>
  );
}

export default BooksView;
