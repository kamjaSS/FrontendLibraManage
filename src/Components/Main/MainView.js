import React from 'react';


const MainView = () => {
  return (
    <div className="background-main letra-Pagina">
      <div className="background-mainColor">
        <div className="container p-5 ">
          <div className="row align-items-center">
            <div className="col-sm-12 d-flex justify-content-center mb-5 background-titulo">
              <h1 className="text-center text-white text-uppercase" style={{fontSize: '60px'}}>Bienvenido a Libramanage</h1>
            </div>
            <div className="col-sm-12 d-flex justify-content-center mt-3 px-5 ">
              <h1 className="text-center text-white text-uppercase" style={{fontSize: '40px', paddingRight: '200px', paddingLeft: '200px'}}>Una biblioteca es un hospital para la mente</h1>
            </div>
            <div className="col-sm-12 d-flex justify-content-center mt-2">
              <button className="btn btn-app btn-lg">Ver libros disponibles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainView;
