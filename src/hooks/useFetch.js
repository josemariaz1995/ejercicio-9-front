import { useCallback, useState } from "react";

export const useFetch = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const fetchEmpepinao = useCallback(async (url, opciones = {}) => {
    setCargando(true);
    setError(false);
    const resp = await fetch(url, opciones);
    setCargando(false);
    if (!resp.ok) {
      setError(true);
      return false;
    }
    return await resp.json();
  }, []);

  return {
    cargando,
    error,
    fetchEmpepinao,
  };
};
