import React, {useContext, useState} from 'react'
import './LoginRegister.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../UserContext'

export default function Login() {
    const {setUserInfo} = useContext(UserContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }).then(res => {
            if(res.status === 422){
                alert('Fill All Fields')
            }else if(res.status === 400){
                alert('Wrong Password')
            } else if(res.status === 200){
                res.json().then(userInfo => {
                    console.log(userInfo);
                    setUserInfo(userInfo)
                })
                navigate('/')
            }
        })
    }

    return (
        <div className='LRcontainer'>
            <Link to='/' className='LRbackHome'> Back Home</Link>
            <div className="LR">
                <div className="LRleft">
                    <h1>Login</h1>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'></input>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'></input>
                    <button onClick={handleSubmit}>Login</button>
                </div>
                <div className="LRright">
                    <h1>Şerşeh's Blog</h1>
                    <p>Non adipisicing sit eu cLaborum consectetur non do  consectetur non do  consectetur non do  consectetur non do consectetur non do met aute consequat occaecat. Aliqua non commodo tempor sit tempor ut occaecat esse ipsum id ut est. Laborum consectetur non dolore quis id tempor.</p>
                    <Link to='/register'><button>Register</button></Link>
                </div>
            </div>
        </div>
    )
}
