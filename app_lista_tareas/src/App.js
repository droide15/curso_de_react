import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './componentes/Header';
import FormularioTareas from './componentes/FormularioTareas';
import ListaTareas from './componentes/ListaTareas';

const App = () => {
  let tareasGuardadas = localStorage.getItem('tareas');
  tareasGuardadas =
  tareasGuardadas ?
  JSON.parse(tareasGuardadas) : [];
  const [tareas, cambiarTareas] = useState(tareasGuardadas);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  let configMostrarCompletadas = localStorage.getItem('mostrarCompletadas');
  if (configMostrarCompletadas === null) {
    configMostrarCompletadas = false;
  } else {
    configMostrarCompletadas = (configMostrarCompletadas === 'true');
  }
  const [mostrarCompletadas, cambiarMostrarCompletadas] = useState(configMostrarCompletadas);

  useEffect(() => {
    localStorage.setItem('mostrarCompletadas', mostrarCompletadas.toString());
  }, [mostrarCompletadas]);

  return (
    <div className="contenedor">
      <Header
          mostrarCompletadas={mostrarCompletadas}
          cambiarMostrarCompletadas={cambiarMostrarCompletadas}
      />
      <FormularioTareas tareas={tareas} cambiarTareas={cambiarTareas} />
      <ListaTareas
          tareas={tareas}
          cambiarTareas={cambiarTareas}
          mostrarCompletadas={mostrarCompletadas}
      />
    </div>
  );
}

export default App;
