import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

  return (
    <div className="navbar">
        <div className="nav-container">
        <Link className="nav-logo" to={'/'}> 
                PERN CRUD
            </Link>
        </div>
        <ul className="nav-menu">
            <button className="button button1" onClick={ () => navigate ('/tasks/new')}>
                Tasks
            </button>
        </ul>
    </div>
  )
}
