import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Typed from "react-typed";
import logo from "../../../assets/icons/logo.png"



import { useStateValue } from '../../StateProvider'
import { database } from '../../../database'
import styled from "styled-components";
import Media from "../../../shared-components/media"

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

function MobileTopBar() {
  const classes = useStyles()



  return (

    <div >

      <MainWrapper className="MontserratSemiBold">
        <img src={logo} width="14%" />

        <Typed
          className="MontserratSemiBold" style={{ color: "#ffffff", paddingTop: "25px", paddingLeft: "10px" }}
          strings={["By 'Al Madina Furniture'"]}
          typeSpeed={70}
          backSpeed={50}
          loop
        />

      </ MainWrapper>

    </div>

  )
}




const MainWrapper = styled.div`
width: 100%;
height: 60px;
background-color:#9f7757;
display: flex;
justify-content: center;
align-items: center;
color:white;
font-size: 30px;
${Media("mobile")} {
  width:100%;
font-size: 12px;

}
`;



export default MobileTopBar
