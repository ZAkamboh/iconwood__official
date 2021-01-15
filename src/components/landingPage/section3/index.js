import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Section1A from "../../../assets/landingPage/section2/section2a.jpg"
import Section1B from "../../../assets/landingPage/section2/section2b.jpg"
import Section1C from "../../../assets/landingPage/section2/section2c.jpg"

import './section3.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow:"hidden",
      marginTop:"2%"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


function LandingSection3() {
    const classes = useStyles();
  return(
  
    <div className={classes.root}>
    <Grid container spacing={3}>
     
      <Grid item xs={4}>
        <Paper className={classes.paper}>
        <img src={Section1A} width="100%"/>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
        <img src={Section1B} width="100%"/>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
        <img src={Section1C} width="100%"/>
        </Paper>
      </Grid>
    
    </Grid>
  </div>
 

  )
  
}

export default LandingSection3
