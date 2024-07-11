import React, {useState} from 'react'
import './LoginRegister.css'
import {Link, useNavigate} from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const passwordSize = password.split('')
        if(passwordSize.length >= 8){
            if(password === confirmPassword){
                const response = await fetch('http://localhost:4000/register', {
                    method: 'POST',
                    body: JSON.stringify({name, email,password}),
                    headers: {'Content-Type':'application/json'},
                })
                if(response.status === 200){
                    alert("Registration Successful")
                    navigate('/login')
                } else if(response.status === 422){
                    alert("Fill All Fields")
                } else if(response.status === 409){
                    alert("Email already in exists. You might want to Login")
                } else {
                    alert("Registration Failed")
                }
            } else alert("Paswords do not match")
        } else alert("Password must be more than 8 characters long")
    }
    
    return (
        <div className='LRcontainer'>
            <Link to='/' className='LRbackHome'>Back Home</Link>
            <div className="LR">
                <div className="LRleft">
                    <h1>Make a New Account</h1>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'></input>
                    <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Username'></input>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'></input>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm Password'></input>
                    <button onClick={handleSubmit}>Register</button>
                </div>
                <div className="LRright">
                    <h1>Şerşeh's Blog</h1>
                    <p>Non adipisicing sit eu consequat est minim ad mollit amet aute consequat occaecat. Aliqua non commodo tempor sit tempor ut occaecat esse ipsum id ut est. Laborum consectetur non do Laborum consectetur non do Laborum consectetur non do Laborum consectetur non do lore quis id tempor.</p>
                    <Link to='/login'><button>Login</button></Link>
                </div>
            </div>
        </div>
    )
}
