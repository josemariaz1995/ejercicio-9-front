import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { Item } from "./Item";

export const Listado = (props) => {
  const { tipos, formularioAbierto, setFormularioAbierto, borrarTipo } = props;
  return (
    <>
      {!formularioAbierto && (
        <Col xs="12">
          <Button variant="warning" onClick={() => setFormularioAbierto({})}>
            Nuevo tipo de gato
          </Button>
        </Col>
      )}
      <Col xs="12" as="ul" className="listado list-unstyled">
        {tipos.map((tipo) => (
          <Item
            key={tipo.id}
            tipo={tipo}
            borrarTipo={borrarTipo}
            setFormularioAbierto={setFormularioAbierto}
          />
        ))}
      </Col>
    </>
  );
};
