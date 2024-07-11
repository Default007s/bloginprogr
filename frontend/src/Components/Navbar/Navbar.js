import React, {useEffect, useContext} from 'react'
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../UserContext'

export default function Navbar() {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
      })
    })
  }, [])

  const logout = () => {
    if(window.confirm('Are you sure you want to LogOut?')){
      fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST', 
      })
      navigate('/login')
      setUserInfo(null)
    }
  }
  let name, email
  if(userInfo){
    name = userInfo.name
    email = userInfo.email
  }
  
  return (
    <nav className='Navbar'>
        <Link className='name' to='/'><h1>SherShah</h1></Link>
        <ul className='firstUl'>
            <Link to="/essays"><li>Essays</li></Link>
            {email === 'shershah1' && (<Link to="/createEssay"><li>Create</li></Link>)}
        </ul>
        <ul className='secondUl'>
          {name && (<>
                          <li><Link className='name' to='/'>{name}</Link></li>
                          <li><Link className='logout' onClick={logout}>LogOut</Link></li>
                        </>
          )}
          {!name && (<>
                          <li><Link className='login' to='/login'>Login</Link></li>
                          <li><Link to='/register' className='signup'>SignUp</Link></li>
                        </>
          )}
        </ul>
    </nav>
  )
}
