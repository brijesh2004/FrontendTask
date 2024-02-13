import React from 'react'
import './Newsletter.css'
const Newsletter = () => {
  return (
    <div className='newsletter'>
      <h1>GET EXCLUSUVE OFFER ON YOUR EMAIL</h1>
      <p>subscribe to our newsletter and stay updated</p>
      <div>
        <input type='email' placeholder='Enter your email id'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default Newsletter
