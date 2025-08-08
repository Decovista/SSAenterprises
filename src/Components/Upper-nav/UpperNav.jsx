import React from 'react'
import './UpperNav.css'

function UpperNav() {
    
  return (
    <div className='UpperNav'>
      <div className="upper-bar-wrapper">
        <p>Connect With US:</p>
        <ul className="contact-top-wrap">
            <li><p><a href="tel: +91 9582 872 872">Call US: +91 9582 872 872</a></p></li>
            <li><p><a href="tel: +91 8368 450 521">+91 8368 450 521</a></p></li>
        </ul>
      </div>
    </div>
  )
}

export default UpperNav
