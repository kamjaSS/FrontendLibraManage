import React, { useState, useEffect } from "react";
import api from "../../api";
import PopupDeleteAuthor from "./PopupDeleteAuthor";
import EditAuthor from "./EditAuthor";
import { fetchToken, RequireToken } from "../Auth.js";

const AuthorView = () => {
  const [authors, setAuthors] = useState([]);
  const [fromAuthors, setFormAuthors] = useState({
    nombre: "",
  });

  const fetchAuthors = async () => {
    const response = await api.get("/all_authors/");
    setAuthors(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/all_authors/");
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setAuthors(response.data);
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

  const handleInputChangeAuthors = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormAuthors({ ...fromAuthors, [event.target.name]: value });
  };

  const handleSubmitAuthors = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", fromAuthors);
    await api.post("/new_author/", fromAuthors);
    fetchAuthors();
    setFormAuthors({
      nombre: "",
    });
  };
  const fetchAuthorEdit = async (id) => {
    const response = await api.get(`/all_authors/${id}`, {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setAuthors(response.data);
  };

  return (
    <div className="container">
      <div
        className="card my-5 p-5"
        style={{ backgroundColor: "#EFEFEF", borderRadius: "25px" }}
      >
        <h2 className="card-title text-center">
          <strong>Registrar Autor</strong>
        </h2>
        <hr style={{ color: "#000" }} />
        <div className="card-body">
          <form onSubmit={handleSubmitAuthors}>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre del autor
              </label>
              <input
                type="text"
                className="form-control w-75 p-3"
                name="nombre"
                alue={fromAuthors.nombre}
                onChange={handleInputChangeAuthors}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear Autor
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-center">
        <strong>Autores Registrados</strong>
      </h2>
      <table className="table table-striped table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {console.log("authors:", authors)}
          {authors.map((autores) => (
            <tr key={autores.id}>
              <td>{autores.id}</td>
              <td>{autores.nombre}</td>
              <td>
                <PopupDeleteAuthor autorDel={autores} onDelete={fetchAuthors} />
                <EditAuthor authorEdit={autores} onEdit={fetchAuthorEdit} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorView;
