
import React, { useState, useEffect } from 'react'

import LandingBanner from './LandingBanner/index.js'
import LandingSection2 from './section2'
import LandingSection4 from './section4'
import LandingSection5 from './section5'

const Landingpage = () => {

     useEffect(() => {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0


     }, [])


     return (
          <div>
                    <LandingBanner />
                    < LandingSection2 />
                    <LandingSection4 />
                    <LandingSection5 />

          </div>

     )
}

export default Landingpage

