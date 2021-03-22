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

function Footer() {
  const classes = useStyles()
  return (
 <div>
   footer
 </div>
  )
}

export default Footer
