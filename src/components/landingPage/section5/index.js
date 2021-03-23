import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Section5A from '../../../assets/landingPage/section5/section5A.jpg'
import Section5B from '../../../assets/landingPage/section5/section5B.jpg'
import Section5C from '../../../assets/landingPage/section5/section5C.jpg'
import Fade from 'react-reveal/Fade'
import { useStateValue } from '../../StateProvider'
import { auth, storage, db, database } from '../../../database'

import './section5.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '2%',
    marginBottom:"5%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

function LandingSection5() {
  const classes = useStyles()
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
    <div id="section5" className={classes.root}>


      {section5Items && section5Items.map((images) => (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Fade left delay={500}>
                <div className="image1-sec5 frame1-sec5">
                  <img src={images.image1} width="95%" />
                </div>
              </Fade>

            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Fade right delay={500}>
              <Paper className={classes.paper}>
                <div className="image1-sec5 frame1-sec5">
                  <img src={images.image2} width="95%" />
                </div>
                <div className="image1-sec5 frame1-sec5" style={{ marginTop: "20px" }}>
                  <img src={images.image3} width="95%" />
                </div>
              </Paper>
            </Fade>

          </Grid>
        </Grid>
      ))}

    </div>
  )
}

export default LandingSection5



