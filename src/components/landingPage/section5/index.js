


import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import './section5.css'
import { useStateValue } from '../../StateProvider'
import { auth, storage, db, database } from '../../../database'

import styled from "styled-components";
import Media from "../../../shared-components/media"
import Fade from 'react-reveal/Fade'
import Typography from '@material-ui/core/Typography';
import Zoom from 'react-reveal/Zoom';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Server } from "../../Services"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: "hidden",
    marginTop: '0%',
    backgroundColor: "#9f77574d",
    paddingTop: "100px",
    paddingBottom: "100px"

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))


function LandingSection5() {
  const classes = useStyles()
  const history = useHistory()

  const [{ section5Items, wishlist, users }, dispatch] = useStateValue()


  useEffect(() => {
    var values = []
    database.ref(`Section5Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      dispatch({
        type: 'SECTION5_DATA',
        payload: values,
      })
    })
  }, [section5Items])



  return (



    <div id="section5Main" className={classes.root}>
      {section5Items && section5Items.map((images) => (

      <Grid container spacing={3}>
        <Grid item xs={1}>


        </Grid>
        <Grid onClick={() => window.open(`${Server}/${images.title}`, '_blank')} style={{ display: "flex", justifyContent: "center" }} item xs={12} sm={6}>

          <Fade right >
            <img style={{cursor:"pointer"}} src={images.url} width="90%" />
          </Fade>

        </Grid>

        <Grid item xs={12} sm={4}>
          <Zoom >
            <div className="main5fordetail" style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"12%"}}>
              <h2 className="MontserratRegular headForMobile" style={{fontWeight:"bold"}}>A table to gather around</h2>
              <div className="MontserratSemiBold paraForMobile" style={{ textAlign: "justify", width: "80%", paddingTop: "20px", lineHeight: "28px" }}>
              Look ahead to happier days and ready your dining space for when you can gather family and friends close again. From the solid oak table at its heart to the chairs, benches, dressers and sideboards that are its perfect partners, you’ll find designs to suit your style of get-together in our collection.
                </div>

              <div className="exploreDinning" onClick={() => window.open(`${Server}/${images.title}`, '_blank')} style={{cursor:"pointer", width: "70%",height:"5vh" ,background: '#9f7757c7', display: "flex", justifyContent: "center", borderRadius: "5px", marginTop: "10%", color: "white",alignItems:"center" }}>
                Explore Dining
                </div>
            </div>

          </Zoom>

        </Grid>

        <Grid item xs={1}>


        </Grid>


      </Grid>
      ))}

    </div>




  )
}



export default LandingSection5
