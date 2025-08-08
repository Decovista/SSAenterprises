import React from 'react'
import asstes from '../../assets/asstes'
import './MiddleBanner.css'
import {Link} from 'react-router-dom'

function MiddleBanner() {
  return (
    <div className='middleBanner'>
      <div className="middleBanner-wrapper-overlay">
        <h2 className='middleBanner-wrapper-head'>Best Material</h2>
        <p className='middleBanner-wrapper-para'>Looking for reliable materials to power your projects? At SSA Enterpises, we supply premium-quality Solar, Plumbing, and Electrical  materials trusted by professionals across residential,industrial sectors.</p>
        <Link to='/About'>
        <button className='middleBanner-wrapper-btn cursor-pointer'>Explore</button></Link>
      </div>
      <div className="middleBanner-wrapper">
        <img src={asstes.middleBanner} alt="promo-banner" />
      </div>
    </div>
  )
}

export default MiddleBanner
