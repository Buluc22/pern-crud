import "./TaskForm.css"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(task),
    });

    } else {

      await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {"Content-Type": "application/json"},
    });
    }
    
    setLoading(false)
    navigate('/')

  }; 

  const handleChange = e => 
    setTask({...task, [e.target.name]: e.target.value});

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setTask({title: data.title, description: data.description})
    setEditing(true)
  }
    
    useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id])

  return (
    <div className="container">
        <form className="form" onSubmit={handleSubmit}>

        <h3>Titulo</h3>
        <input type="text" name="title" onChange={handleChange} value={task.title}></input>
        
        <h3>Descripcion</h3>
        <input type="text" name="description" onChange={handleChange} value={task.description} />

        <button className="registerbtn" type="submit" disabled={!task.title || !task.description}>
          {loading ? 'Loading...' : 'Save'}
        </button>
        
        </form>

    </div>
  )
}
