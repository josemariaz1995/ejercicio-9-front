import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

export const Formulario = (props) => {
  const { formularioAbierto, setFormularioAbierto, nuevoTipo, editarTipo } =
    props;
  const editando = !!formularioAbierto.id;
  const [tipo, setTipo] = useState(editando ? formularioAbierto.tipo : "");
  const textoBoton = editando ? "Editar" : "Crear";
  const elementoInput = useRef(null);
  useEffect(() => {
    elementoInput.current.focus();
  }, []);
  const setDato = (e) => {
    setTipo(e.target.value);
  };
  const guardaTipo = (e) => {
    e.preventDefault();
    if (editando) {
      editarTipo({
        id: formularioAbierto.id,
        tipo,
      });
    } else {
      nuevoTipo({
        tipo,
      });
    }
    setFormularioAbierto(false);
  };
  return (
    <Col xs="12">
      <Form noValidate onSubmit={guardaTipo}>
        <Form.Group controlId="nombre">
          <Form.Label>Tipo de gato:</Form.Label>
          <Form.Control
            type="text"
            value={tipo}
            onChange={setDato}
            ref={elementoInput}
          />
        </Form.Group>
        <Button type="submit" variant="info">
          {textoBoton}
        </Button>
        <Button
          type="button"
          variant="warning"
          onClick={() => setFormularioAbierto(false)}
        >
          Cancelar
        </Button>
      </Form>
    </Col>
  );
};
