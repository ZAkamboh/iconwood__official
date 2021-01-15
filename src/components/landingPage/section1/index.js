import React from 'react'
import Typical from 'react-typical'

import './section1.css'
import BannerImage from '../../../assets/landingPage/section1/banner_home.jpg'
function LandingSection1() {
  return (
    <div className="landingSection1">
      <div className="banner__text">
        <div className="banner__text__inner" >
          <h1>How can I make my</h1>
          <h1>home friendly?</h1>
          <p>LES’T IT MAKE. </p>
          <Typical
          steps={['LES’T ', 1500, 'IT MAKE Consulting',1500,'IT MAKE IDEA',1500,'IT MAKE WORK',1500]}
          loop={Infinity}
          wrapper="p"
        />
        </div>
      </div>
      <div className="banner__image">
        <img
          className="banner_image_inner"
          src={BannerImage}
          alt="home__banner"
        />
      </div>

    
    </div>
  )
}

export default LandingSection1
