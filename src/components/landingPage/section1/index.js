


import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typed from "react-typed";
import './section1.css'
import BannerImage from '../../../assets/landingPage/section1/banner_home.jpg'
import { useStateValue } from '../../StateProvider'
import { auth, storage, db, database } from '../../../database'
import Nexticon from "../../../assets/icons/nexticon2.png";
import Previousicon from "../../../assets/icons/previousicon2.png";
import { Carousel } from "react-bootstrap";

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

function LandingSection1() {
  const classes = useStyles()
  const [{ section1Items, wishlist, users }, dispatch] = useStateValue()

  useEffect(() => {
    var values = []
    database.ref(`Section1Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      dispatch({
        type: 'SECTION1_DATA',
        payload: values,
      })
    })
  }, [section1Items])



  return (
    <Carousel pause={false} interval={6000} indicators={false} nextIcon={<img src={Nexticon} alt="error" height="30px" width="30px" />} prevIcon={<img src={Previousicon} alt="error" height="30px" width="30px" />}  >
      {section1Items && section1Items.map((image, index) => {
        return (
          <Carousel.Item>
            <div className="landingSection1">
              <div className="banner__text">


                <Typed
                  strings={["Furnishing Your Dreams"]}
                  typeSpeed={60}
                  backSpeed={50}
                  loop
                />
              </div>
              <div className="banner__image">
                <img
                  className="banner_image_inner"
                  src={image.url}
                  alt="home__banner"
                />
              </div>


            </div>
          </Carousel.Item>
        )
      })}
    </Carousel>




  )
}

export default LandingSection1
