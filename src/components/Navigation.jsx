import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="tabs">
      <NavLink 
        to="/devices" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Devices
      </NavLink>
      <NavLink 
        to="/employees" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Employees
      </NavLink>
      <NavLink 
        to="/assignments" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Assignments
      </NavLink>
    </nav>
  )
}

export default Navigation
