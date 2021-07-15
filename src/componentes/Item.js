export const Item = (props) => {
  const { tipo, borrarTipo, setFormularioAbierto } = props;
  const onClickBorrar = (e) => {
    e.preventDefault();
    borrarTipo(tipo);
  };
  const onClickEditar = (e) => {
    e.preventDefault();
    setFormularioAbierto(tipo);
  };
  return (
    <li>
      {tipo.tipo} (
      <a href="editar" onClick={onClickEditar}>
        editar
      </a>{" "}
      <a href="borrar" onClick={onClickBorrar}>
        borrar
      </a>
      )
    </li>
  );
};
