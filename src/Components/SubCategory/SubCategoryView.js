import React, { useState, useEffect } from "react";
import api from "../../api";
import PopupDeleteSubcateg from "./PopupDeleteSubcateg";
import EditSubCategory from "./EditSubCategory";
import { fetchToken, RequireToken } from "../Auth.js";

const SubCategoryView = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [fromSubcategories, setFormSubcategories] = useState({
    nombre: "",
  });

  const fetchSubcategories = async () => {
    const response = await api.get("/all_subcategories/");
    setSubcategories(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/all_subcategories/");
        console.log(Array.isArray(response.data));
        if (Array.isArray(response.data)) {
          setSubcategories(response.data);
        } else {
          console.error(
            "La respuesta de la API no es un array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChangeSubcategories = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormSubcategories({ ...fromSubcategories, [event.target.name]: value });
  };

  const handleSubmitSubcategories = async (event) => {
    event.preventDefault();
    console.log("Formulario de categorías:", fromSubcategories);
    await api.post("/new_subcategory/", fromSubcategories);
    fetchSubcategories();
    setFormSubcategories({
      nombre: "",
    });
  };
  const fetchSubCategoryEdit = async (id) => {
    const response = await api.get(`/all_subcategories/${id}`, {
      headers: { Authorization: `Bearer ${fetchToken()}` },
    });
    setSubcategories(response.data);
  };

  return (
    <div className="container">
      <div
        className="card my-5 p-5"
        style={{ backgroundColor: "#EFEFEF", borderRadius: "25px" }}
      >
        <h2 className="card-title text-center">
          <strong>Registrar Subcategoría</strong>
        </h2>
        <hr style={{ color: "#000" }} />
        <div className="card-body">
          <form onSubmit={handleSubmitSubcategories}>
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre de la subcategoría
              </label>
              <input
                type="text"
                className="form-control w-50 p-3"
                name="nombre"
                value={fromSubcategories.nombre}
                onChange={handleInputChangeSubcategories}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crear subcategoría
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-center">
        <strong>SubCategorías Registradas</strong>
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
          {console.log("Subcategories:", subcategories)}
          {subcategories.map((subcategoría) => (
            <tr key={subcategoría.id}>
              <td>{subcategoría.id}</td>
              <td>{subcategoría.nombre}</td>
              <td>
                <PopupDeleteSubcateg
                  subcategoríaDel={subcategoría}
                  onDelete={fetchSubcategories}
                />
                <EditSubCategory
                  subcategoryEdit={subcategoría}
                  onEdit={fetchSubCategoryEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategoryView;
