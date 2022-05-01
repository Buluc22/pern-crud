import { useEffect, useState } from 'react'
import './TasksList.css'

export default function TaskList() {
  // variable global de tareas --- const tasks = [];
  const [tasks, setTasks] = useState([])
  // Funcion que nos jala los datos del servidor... fetch() -> asigna las tareas
  const loadTasks = async () => {
    let response = await fetch("http://localhost:4000/tasks"); // recibimos los datos del servidor
    let data = await response.json();// convertimos los datos recibidos del servidor para que el js pueda leerlos.
    // console.log(data); // imprimimos en pantalla.
    setTasks(data)
  }
  // Funcion que nos asigna los datos en el componente fetch -> la variable tasks
  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <div className='container2'>
      <h1 class="text">Datos PERN CRUD</h1><br></br>
      {
        tasks.map(task => (
          
          <div className="grid-container2" key={task.id}>
            <div>
                  <label for="fname">Titulo</label>
                  <input type="texto" id="fname" name="fname" value={task.title}>
                  
                  </input>
            </div>

            <div>
                <label for="lname">Descripcion</label>
                <input type="texto" id="lname" name="lname" value={task.description}>
                
                </input>
            </div>

            <div>
                <button className="buttonn button1" onClick={() => console.log('edit')}>
                  Actulizar
                </button>
            </div>

            <div>
                <button className="buttonn button3" onClick={() => console.log('delete')}>
                  Eliminar
                </button>
            </div>
          </div>

          /*<div className='taskHead' key={task.id}>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
          </div>*/

          /*<div className='card'>
            <div className='container'>
            <input>{task.title}</input>
            <box>{task.description}</box>
            <button className="btn warning">Actualizar</button>
            <button className="btn danger">Borrar</button>
            </div>
          </div>*/
        ))
      }
    </div>
  );
}
