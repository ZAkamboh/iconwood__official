import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Fade from 'react-reveal/Fade'
import Banner from '../../assets/images/www.png'
import logo from "../../assets/icons/logo.png"

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './about.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '13%',
    marginBottom:"3%",
    backgroundColor:"#56574f",
    borderBottom:"1px solid grey",
    paddingBottom:"30px",
    paddingTop:"30px"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function About() {
  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
   

  }, [])
  const classes = useStyles()
  return (
    <div class="about-section" style={{backgroundImage: `url(${Banner})`,backgroundRepeat:"no-repeat" }}>
    <div class="inner-container">
        <h1>About Us</h1>
        <p id="MontserratRegular" class="text">
        Iconwood By 'Al Madina Furniture' is a furniture manufacturer, established in 1988, principally involved in design, manufacture and sale of furniture products.
'Al Madina Furniture' has devoted itself to the designing and manufacturing 
Our customers are mainly retailers and traders.
We strive to offer elegant furniture products at better rates and quality.
        </p>
   

        <div style={{display:"flex",justifyContent:"center"}}>
            <img src={logo} width="25%"/>
        </div>
       
    </div>
</div>
  )
}

export default About
