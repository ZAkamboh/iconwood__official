import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Fade from 'react-reveal/Fade'
import { auth, storage, db, database } from '../../../database'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'



import { Carousel } from "react-bootstrap";

import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { Server } from "../../Services"


import './section4.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '0%',
    backgroundColor: "#9f77574d",
    paddingTop: "50px",
    paddingBottom: "100px"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function LandingSection4(props) {
  const [{ section4Items, wishlist, users }, dispatch] = useStateValue()
  const history = useHistory()

  const [viewproduct, setviewproduct] = useState(false)
  const [section4Data, setsection4Data] = useState([])
  const [wishlistWithInFunc, setwishlistWithInFunc] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    var values = []
    database.ref(`Section4Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      dispatch({
        type: 'SECTION4_DATA',
        payload: values,
      })
    })
  }, [section4Items])


  return (
    <Carousel pause={false} interval={2000} indicators={false} nextIcon={false} prevIcon={false}  >

      {section4Items && section4Items.map((image, index) => {
        return (
          <Carousel.Item>
              <div onClick={() => window.open(`${Server}/${image.title}`, '_blank')} className="MontserratSemiBold" style={{cursor:"pointer",borderRadius:"5px", position: "absolute",marginLeft:"2%",padding:"5px",paddingLeft:"10px", backgroundColor: "red", color: "white",fontSize:"9px",paddingRight:"10px",right:"15%",bottom:"3%" }}>
        <ShoppingCartIcon style={{fontSize:"12px"}}/> Explore For Buy
              </div>
            <div style={{cursor:"pointer"}} onClick={() => window.open(`${Server}/${image.title}`, '_blank')}  className="banner__image">
              <img
                className="banner_image_inner"
                src={image.url}
                alt="home__banner"
              />
            </div>
          </Carousel.Item>
        )
      })}



    </Carousel>
  )
}

export default LandingSection4
