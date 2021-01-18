import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Fade from 'react-reveal/Fade'

import './footer.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '13%',
    marginBottom:"3%",
    backgroundColor:"#f8f8f8",
    borderBottom:"1px solid grey",
    paddingBottom:"30px",
    paddingTop:"30px"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function Footer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid className={classes.paper} item xs={3}>
              <div className="address"  >
               <h1>Icon Wood</h1>
               <p className="paddingTopBottom">101 E-Market Block 6 P.E.C.H.S karachi,</p>
               <span className="paddingTopBottom"><LocationOnIcon/></span> <span className="paddingTopBottom">180 E-Market,khi,Pakistan</span>
               <span className="paddingTopBottom"><CallIcon/></span> <span className="paddingTopBottom">Phone:03312380673</span> 
               <span className="paddingTopBottom"><MailOutlineIcon/></span> <span className="paddingTopBottom">iconwood1619@gmail.com</span>

              </div>
          </Grid>

          <Grid className={classes.paper}  item xs={3}>
          <div className="address"  >
          <h1>Recent Posts</h1>
          <p className="paddingTopBottom">Last post JAN,18,2021</p>
          <span className="paddingTopBottomPosting">POST 1</span>
         <span className="paddingTopBottomPosting">POST 2</span> 
         <span className="paddingTopBottomPosting">POST 3</span>

         </div>
        </Grid>

        <Grid className={classes.paper} item xs={3}>
        <div className="address"  >
        <h1>OUR STORES</h1>
        <p className="paddingTopBottom">Store Manager</p>
        <span className="paddingTopBottomPosting">Instagram</span>
       <span className="paddingTopBottomPosting">Testimonials</span> 
       <span className="paddingTopBottomPosting">Socials</span>
       <span className="paddingTopBottomPosting">Iconbox</span>
       <span className="paddingTopBottomPosting">Banner Simple</span>


       </div>
      </Grid>

      <Grid className={classes.paper} item xs={3}>
      <div className="address"  >
      <h1>USEFUL LINKS</h1>
      <p className="paddingTopBottom">Store Manager</p>
      <span className="paddingTopBottomPosting">Privacy Policy</span>
     <span className="paddingTopBottomPosting">Returns</span> 
     <span className="paddingTopBottomPosting">Terms & Conditions</span>
     <span className="paddingTopBottomPosting">Contact Us</span>
     <span className="paddingTopBottomPosting">Our Sitemap</span>
     </div>
    </Grid>
      
      
        </Grid>
    </div>
  )
}

export default Footer
