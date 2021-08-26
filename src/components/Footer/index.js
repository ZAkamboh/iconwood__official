import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Fade from 'react-reveal/Fade'
import logo from "../../assets/icons/logo.png"
import { useHistory } from "react-router-dom";

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './footer.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '13%',
    marginBottom: "3%",
    backgroundColor: "#56574f",
    borderBottom: "1px solid grey",
    paddingBottom: "30px",
    paddingTop: "30px"
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function Footer() {
  const classes = useStyles()
  const history = useHistory();

  return (
    <div class="footer-dark">
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-3 item">
              <h3>Services</h3>
              <ul style={{cursor:"pointer"}}>
                <li id="MontserratRegular" class="size" onClick={() => history.push('/beds')}>Beds</li>
                <li id="MontserratRegular" class="size" onClick={() => history.push('/chairs')} >Chairs</li>
                <li id="MontserratRegular" class="size" onClick={() => history.push('/sofas')}>Sofas</li>
                <li id="MontserratRegular" class="size" onClick={() => history.push('/swings')} >Swings</li>

                <li id="MontserratRegular" class="size" onClick={() => history.push('/dinnings')} >Dinning</li>
                <li id="MontserratRegular" class="size" onClick={() => history.push('/centerTables')}>Tables</li>
              </ul>
            </div>
            <div class="col-sm-6 col-md-3 item">
              <h3>Contact</h3>
              <ul>
                <li><a href="#" class="size2">03312380673</a></li>
                <li><a href="#" class="size2">P.E.C.H.S Block 6 E Market Karachi . Pakistan</a></li>


              </ul>
            </div>
            <div class="col-md-6 item text">
              <h3>Icon Wood</h3>
              <p class="size3" style={{ color: "grey" }}>At IconWood, we do what we do – from our Home Design Service to the pieces we make – because we believe that good, considered design can make your life that little bit happier and easier. We do that using the best materials and the most trustworthy of techniques, surrounded by people who genuinely care about creating things that are timeless. We’re also always asking ‘could we do this better?’ And that’s where our ‘different perspective’ comes in.</p>
            </div>
            <div class="col item social"><a href="https://www.facebook.com/iconwoodpk1988/"><i class="icon ion-social-facebook"><FacebookIcon /></i></a><a href="https://www.instagram.com/iconwoodofficial"><i class="icon ion-social-twitter"><InstagramIcon /></i></a><a href="#"><i class="icon ion-social-snapchat"><TwitterIcon /></i></a><a href="#"><i class="icon ion-social-instagram"><LinkedInIcon /></i></a></div>
          </div>
          <p class="copyright">Icon Wood © 2021</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            < img src={logo} width="50px" class="copyright" />

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
