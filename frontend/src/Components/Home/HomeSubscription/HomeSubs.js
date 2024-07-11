import React from 'react'
import './HomeSubs.css'
import scholarWriting from '../../../Images/scholarwriting.webp'

export default function HomeSubs() {
  return (
    <div className='HomeSubs'>
      <div className="upperHomeSubs">
        <img src={scholarWriting}></img>
        <h1>Sign up for New Posts in your Inbox</h1>
      </div>
      <div className='getEmail'>
        <input placeholder='Enter your @ email' type='email'></input>
        <button>Submit</button>
      </div>
    </div>
  )
}
