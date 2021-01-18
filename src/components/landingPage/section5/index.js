import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Section5A from '../../../assets/landingPage/section5/section5A.jpg'
import Section5B from '../../../assets/landingPage/section5/section5B.jpg'
import Section5C from '../../../assets/landingPage/section5/section5C.jpg'
import Fade from 'react-reveal/Fade'

import './section5.css'

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
  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
            <Fade left delay={500}>
            <div className="image1-sec5 frame1-sec5">
            <img src={Section5A} width="95%" />
          </div>
            </Fade>
             
            </Paper>
          </Grid>

          <Grid item xs={6}>
          <Fade right delay={500}>
          <Paper className={classes.paper}>
          <div className="image1-sec5 frame1-sec5">
            <img src={Section5B} width="95%" />
          </div>
          <div className="image1-sec5 frame1-sec5" style={{marginTop:"20px"}}>
          <img src={Section5C} width="95%" />
        </div>
        </Paper>
          </Fade>
        
        </Grid>
        
        </Grid>
    </div>
  )
}

export default LandingSection5
