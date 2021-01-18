import React, {useEffect,useState} from "react"

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Section1A from '../../../assets/landingPage/section2/section2a.jpg'
import Section1B from '../../../assets/landingPage/section2/section2b.jpg'
import Section1C from '../../../assets/landingPage/section2/section2c.jpg'
import Fade from 'react-reveal/Fade'

import './section3.css'

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

function LandingSection3() {
  const classes = useStyles()

  const [state, setstate] = useState(0)
  const forbottomborder =(value)=>{
    setstate(value)
  }
  const forhiddenBorder =()=>{
   setstate(false)
  }


  return (
    <div className={classes.root}>
    <Fade top  delay={500}>
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className="section3__Main">
          <h1>
            Icon Wood® is a curation of <br />
            minimalist styles that inspire us.
          </h1>
          <Fade bottom delay={1000}>
          <div className="section3__Icons">
          <div className="section3__Icons__inner">
          <div onMouseOver={()=>forbottomborder(1)} onMouseLeave={forhiddenBorder} className={state===1 && "colorRed"}>Lightning</div>
          <div onMouseOver={()=>forbottomborder(2)} onMouseLeave={forhiddenBorder} className={state===2 && "colorBlue"}>Desk</div>
          <div onMouseOver={()=>forbottomborder(3)} onMouseLeave={forhiddenBorder} className={state===3 && "colorGreen"}>BedRoom</div>
          <div onMouseOver={()=>forbottomborder(4)} onMouseLeave={forhiddenBorder} className={state===4 && "colorYellow"}>Chair</div>
          <div onMouseOver={()=>forbottomborder(5)} onMouseLeave={forhiddenBorder} className={state===5 && "colorBrown"}>Accessories</div>
          </div>
           

          </div>
          </Fade>
      

        </div>
      </Paper>
    </Grid>
  </Grid>
    </Fade>
    
    </div>
  )
}

export default LandingSection3
