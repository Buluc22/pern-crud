import {BrowserRouter, Routes, Route} from 'react-router-dom'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Menu from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
    <Menu/>

     <Routes>
       <Route path='/' element={<TaskList/>}/>
       <Route path='/tasks/new' element={<TaskForm/>}/>
       <Route path='/tasks/:id/edit' element={<TaskForm/>}/>
     </Routes>
     
    </BrowserRouter>
  )
}

