import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Section1A from '../../../assets/landingPage/section2/section2a.jpg'
import Section1B from '../../../assets/landingPage/section2/section2b.jpg'
import Section1C from '../../../assets/landingPage/section2/section2c.jpg'
import Fade from 'react-reveal/Fade'
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

function LandingSection2() {
  const classes = useStyles()
  const [{ section2Items, wishlist, users }, dispatch] = useStateValue()

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
  }, [section2Items])

  return (
    <div className={classes.root}>
      <Fade bottom delay={1000}>
        <Grid container spacing={3}>


          {section2Items &&
            section2Items.map((item, i) => {
              return (
                <Grid key={item} item xs={4}>
                  <Paper id="item__Wrapper" className={classes.paper}>
                    <div className="image1-sec5 frame1-sec5">
                      <img src={item.url} width="95%" />
                    </div>
                  </Paper>
                </Grid>
              )
            })}


        </Grid>
      </Fade>
    </div>
  )
}

export default LandingSection2
