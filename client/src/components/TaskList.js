/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './TasksList.css'

export default function TaskList() {
  
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()
  
  const loadTasks = async () => {
    let response = await fetch("http://localhost:4000/tasks"); 
    let data = await response.json();
    setTasks(data)
  }

  const handleDelete = async (id) => {
    // console.log(id);
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE", 
    })
    let a = await res.json()  
    if ((a.status !== undefined) && a.status) {
      alert("Se ha eliminado correctamente la tarea");
      await loadTasks();
    } else {
      alert("No se ha podido eliminar la tarea.");
    }
  }
  
  useEffect(() => {
    loadTasks();
  }, [])

  return (
    <div className='container2'>
      <h1 className="text">Datos PERN CRUD</h1><br></br>
      {
        tasks.map(task => (
          
          <div className="grid-container2" key={task.id}>
            <div>
                  <label htmlFor={'input0_'+task.id}>Titulo</label>
                  <input type="text" id={'input0_'+task.id} name="title" defaultValue={task.title}/>
            </div>

            <div>
                <label htmlFor={'input1_'+task.id}>Descripcion</label>
                <input type="text" id={'input1_'+task.id} name="description" defaultValue={task.description}/>
            </div>

            <div>
                <button className="buttonn button1" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                  Actulizar
                </button>
            </div>

            <div>
                <button className="buttonn button3" onClick={() => {handleDelete(task.id)}}>
                  Eliminar
                </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}
