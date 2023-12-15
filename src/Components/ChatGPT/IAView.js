import React , { useState, useEffect, useRef } from 'react';
import api from '../../api';
import { Card, CardBody, Button } from 'react-bootstrap';

const IAView = () => {
  
  const refForm = useRef();

  const [options] = useState([
    'Cuantos libros se van a prestar',
    'Cuantos libros no se van a devolver',
    'Que hace LibraManaje'
  ]);

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [response, setResponse] = useState('');

  const sendRequest = async () => {
    try {
      const response = await api.get(`/consultaChatGPT/${selectedOption}`);
      console.log(response.data.respuesta);
      setResponse(response.data.respuesta);
      refForm.current.querySelector('[name="selectOption"]').selectedIndex = 0;
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div className="py-4 fondo-IA">
      <div className="mt-4 row justify-content-center">
        <div className="col-md-8">
          <Card style={{ backgroundColor: '#1F6CC2', color: 'white' }}>
            <CardBody>
              <div className="d-flex align-items-center mb-3" style={{ backgroundColor: '#4A90E2', color: 'white' }}>
                <img src='https://freelogopng.com/images/all_img/1681038242chatgpt-logo-png.png' alt="LogoIA" height="30" className="mx-3" />
                <h2 className="text-center mb-0">Consulta a la IA</h2>
              </div>
              <div ref={refForm} className="form-group">
                <label htmlFor="selectOption">Seleccione una opción:</label>
                <select
                  name="selectOption"
                  id="selectOption"
                  className="form-control"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option selected="true" disabled="disabled">Seleccione el opción</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <button
                variant="primary"
                className="btn-block btn-IA"
                onClick={sendRequest}
              >
                Enviar
              </button>
              <div className="mt-3">
                <strong className='text-white'>Respuesta de la IA:</strong><br/>
                <div className='p-2' style={{backgroundColor: '#EFEFEF', color: '#111'}}>
                {response}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default IAView;