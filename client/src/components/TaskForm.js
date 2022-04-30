import "./TaskForm.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {"Content-Type": "application/json"},
    })

    const data = await res.json()
    
    setLoading(false)
    navigate('/')

  }; 

  const handleChange = e => 
    setTask({...task, [e.target.name]: e.target.value});
  

  return (
    <div>
        <form className="form" onSubmit={handleSubmit}>

        <label>Titulo</label>
        <input name="title" onChange={handleChange}></input>
        
        <label>Descripcion</label>
        <input name="description" onChange={handleChange} />

        <button type="submit" disabled={!task.title || !task.description}>
          {loading ? 'Loading...' : 'Create'}
        </button>
        
        </form>

    </div>
  )
}
