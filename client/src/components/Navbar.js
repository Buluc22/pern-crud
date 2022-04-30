import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

  return (
    <div className="header">
        <div className="nav-container">
            
            <label>
            <Link className="" to={'/'}> 
                PERN CRUD
            </Link>
            </label>

        <ul className="nav_links">
            <button className="button button1" onClick={ () => navigate ('/tasks/new')}>
                Tasks
            </button>
        </ul>
        </div>
    </div>
  )
}
