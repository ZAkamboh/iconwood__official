import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Zoom from 'react-reveal/Zoom';
import Banner1 from "../../../assets/images/banner1.jpg"
import Banner2 from "../../../assets/images/banner2.jpg"

import { Carousel } from "react-bootstrap";


import { useStateValue } from '../../StateProvider'
import { database } from '../../../database'
import styled from "styled-components";
import Media from "../../../shared-components/media"
import './LandingBanner.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '2%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

function LandingBanner() {
  const classes = useStyles()
  const [{ LandingBanners, wishlist, users }, dispatch] = useStateValue()


  useEffect(() => {
    var values = []
    database.ref(`landingbanners`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      dispatch({
        type: 'Landing_bannners_DATA',
        payload: values,
      })
    })
  }, [LandingBanners])


  return (

    <div className="LandingBannerMain" >
      {/* <Carousel pause={false} interval={4000} indicators={false} nextIcon={false} prevIcon={false}  >

        {LandingBanners && LandingBanners.map((image, index) => {
          return (
            <Carousel.Item>
              < BannerText>
                <Zoom>
                  Furnishing Your Dreams

                    </Zoom>

              </ BannerText>
              <BannerImage >
                <img
                  width="100%"
                  src={image.url}
                  alt="home__banner"
                />
              </BannerImage>


            </Carousel.Item>
          )
        })}
      </Carousel> */}

<Carousel pause={false} interval={4000} indicators={false} nextIcon={false} prevIcon={false}  >


    <Carousel.Item>
      < BannerText>
        <Zoom>
          Furnishing Your Dreams

            </Zoom>

      </ BannerText>
      <BannerImage >
        <img
          width="100%"
          src={Banner1}
          alt="home__banner"
        />
      </BannerImage>


    </Carousel.Item>



    <Carousel.Item>
      < BannerText>
        <Zoom>
          Furnishing Your Dreams

            </Zoom>

      </ BannerText>
      <BannerImage >
        <img
          width="100%"
          src={Banner2}
          alt="home__banner"
        />
      </BannerImage>


    </Carousel.Item>

</Carousel>









    </div>

  )
}




const BannerText = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-color:rgba(0, 0, 0, 0.63);
display: flex;
justify-content: center;
align-items: center;
color:white;
font-size: 45px;

${Media("mobile")} {
  width:100%;
font-size: 18px;

}
`;

const BannerImage = styled.div`
width: 100%;
height: 100%;

${Media("mobile")} {
  width:100%;
  height:100%;
  font-size: 12px;
}
`;

export default LandingBanner
