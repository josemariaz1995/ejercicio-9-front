import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Cargando } from "./componentes/Cargando";
import { Error } from "./componentes/Error";
import { Formulario } from "./componentes/Formulario";
import { Listado } from "./componentes/Listado";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [formularioAbierto, setFormularioAbierto] = useState(null);
  const [tipos, setTipos] = useState([]);
  const urlAPI = process.env.REACT_APP_URL_API;
  const { cargando, error, fetchEmpepinao } = useFetch(urlAPI);
  const nuevoTipo = async (tipo) => {
    const tipoCreado = await fetchEmpepinao(urlAPI + "nuevo-tipo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipo),
    });
    if (tipoCreado) {
      setTipos([...tipos, tipoCreado]);
    }
  };
  const borrarTipo = async (tipo) => {
    const respuesta = await fetchEmpepinao(urlAPI + "tipo/" + tipo._id, {
      method: "DELETE",
    });
    if (respuesta) {
      setTipos(tipos.filter((tipoGato) => tipoGato._id !== tipo._id));
    }
  };
  const editarTipo = async (tipo) => {
    const tipoModificado = await fetchEmpepinao(urlAPI + "tipo/" + tipo._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipo),
    });
    if (tipoModificado) {
      await cargarTipos();
    }
  };
  const cargarTipos = useCallback(async () => {
    const tiposAPI = await fetchEmpepinao(urlAPI + "/listado");
    if (tiposAPI) {
      setTipos(tiposAPI);
    }
  }, [fetchEmpepinao, urlAPI]);

  useEffect(() => {
    cargarTipos();
  }, [cargarTipos]);
  return (
    <Container className="contenedor">
      <Row as="header">
        <Col as="h1">Tipos de gatos</Col>
      </Row>
      {error && <Error />}
      <Row as="main">
        {formularioAbierto ? (
          <Formulario
            formularioAbierto={formularioAbierto}
            nuevoTipo={nuevoTipo}
            editarTipo={editarTipo}
            setFormularioAbierto={setFormularioAbierto}
            cargarTipos={cargarTipos}
          />
        ) : (
          <Listado
            tipos={tipos}
            formularioAbierto={formularioAbierto}
            borrarTipo={borrarTipo}
            setFormularioAbierto={setFormularioAbierto}
          />
        )}
      </Row>
      {cargando && <Cargando />}
    </Container>
  );
}

export default App;
