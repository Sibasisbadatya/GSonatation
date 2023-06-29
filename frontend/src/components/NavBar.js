import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css';
export default function NavBar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left">Quote App</Link>
        <ul className="right">
          {
            token ?
              <>
                <Link to="/profile"><li className='rightli' ><span>Profile</span></li></Link>
                <Link to="/create"><li className='rightli' ><span>Create</span></li></Link>
                <li className='rightli'><button className="red btn" onClick={() => {
                  localStorage.removeItem("token")
                  navigate('/login')
                }}>Logout</button></li>

              </> :
              <>
                <Link to="/login"><li className='rightli' ><span>Login</span></li></Link>
                <Link to="/signup"><li className='rightli' ><span>SignUp</span></li></Link>
              </>
          }


        </ul>
      </div>
    </nav>
  )
}