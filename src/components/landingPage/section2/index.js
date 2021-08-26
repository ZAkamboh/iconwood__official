import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import section3 from '../../../assets/images/1.jpg'
import section3two from '../../../assets/images/2.jpg'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'


import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom';
import { Server } from "../../Services"

import { useStateValue } from '../../StateProvider'
import { auth, storage, db, database } from '../../../database'

import './section2.css'

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

function LandingSection5() {
  const classes = useStyles()
  const [{ section2Items, section3Items, wishlist, users }, dispatch] = useStateValue()

  useEffect(() => {
    var values = []
    database.ref(`Section2Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }
      dispatch({
        type: 'SECTION2_DATA',
        payload: values,
      })


    })


    var values2 = []
    database.ref(`Section3Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values2.push({ ...fetchData[keys], key: keys })
      }
      dispatch({
        type: 'SECTION3_DATA',
        payload: values2,
      })


    })



  }, [section2Items])
  return (
    <div id="section5" style={{ backgroundColor: "#eeede9", width: "100%" }} className={classes.root}>


      {section2Items && section2Items.map((images) => (
        <Grid container spacing={3}>

          <Grid item xs={1}>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Zoom >
              <div className="headText ">
                <h1 className="MontserratRegular headForMobile" style={{ fontWeight: "bold" }}>Why IconWood?</h1>
                <div className="MontserratSemiBold paraForMobile" style={{ textAlign: "justify", width: "80%", paddingTop: "20px", lineHeight: "28px" }}>
                  At IconWood, we do what we do – from our Home Design Service to the pieces we make – because we believe that good, considered design can make your life that little bit happier and easier. We do that using the best materials and the most trustworthy of techniques, surrounded by people who genuinely care about creating things that are timeless. We’re also always asking ‘could we do this better?’ And that’s where our ‘different perspective’ comes in.
                </div>

                <div onClick={() => window.open(`${Server}/${"about"}`, '_blank')} className="readMoreButton" style={{ width: "50%", height: "5vh", background: '#9f7757c7', display: "flex", justifyContent: "center", borderRadius: "5px", marginTop: "10%", color: "white", alignItems: "center", cursor: "pointer" }}>
                  Read More About IconWood
                </div>
              </div>

            </Zoom>

          </Grid>

          <Grid onClick={() => window.open(`${Server}/${images.title}`, '_blank')} style={{ display: "flex", justifyContent: "center" }} item xs={12} sm={6}>

            <Fade right >
              <img className="imageOpacity" src={images.url} width="90%" />
            </Fade>

          </Grid>

          <Grid item xs={1}>


          </Grid>

        </Grid>
      ))}








      <Grid className="section3" style={{ marginTop: "100px" }} container spacing={3}>

        <Grid item xs={1}>
        </Grid>
        <Grid onClick={() => window.open(`${Server}/${'centerTables'}`, '_blank')} item xs={12} sm={5}>
          <div className="MontserratSemiBold" style={{ cursor: "pointer", borderRadius: "5px", position: "absolute", marginTop: "2%",marginLeft:"3px", padding: "5px", paddingLeft: "10px", backgroundColor: "red", color: "white", fontSize: "9px", paddingRight: "10px" }}>
            <ShoppingCartIcon style={{ fontSize: "12px" }} /> Explore For Buy
              </div>

            <img style={{ cursor: "pointer", opacity: "0.3px" }} src={section3} width="100%" />


        </Grid>




        <Grid onClick={() => window.open(`${Server}/${'chairs'}`, '_blank')} item xs={12} sm={5}>



          <div className="MontserratSemiBold" style={{ cursor: "pointer", borderRadius: "5px", position: "absolute", marginTop: "2%",marginLeft:"3px", padding: "5px", paddingLeft: "10px", backgroundColor: "red", color: "white", fontSize: "9px", paddingRight: "10px" }}>
            <ShoppingCartIcon style={{ fontSize: "12px" }} /> Explore For Buy
              </div>
          <div style={{ cursor: "pointer" }} style={{ opacity: "0.3px"}}>

            <img src={section3two} width="100%" />


          </div>



        </Grid>

        <Grid item xs={1}>


        </Grid>
      </Grid>

    </div>
  )
}

export default LandingSection5



