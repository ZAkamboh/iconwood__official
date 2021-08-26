import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { auth,database } from '../../../database'
import axios from 'axios'
import { BackServer } from "../../Services"

import styled from "styled-components";
import CompanyLogo from "../../../shared-components/company-logo";
import { colors, Media } from "../../../shared-components";

import { Drawer, Button, Radio, Space } from 'antd'
import './adminnavbar.css'
function AdminNavbar() {
  const history = useHistory()
  const [{ basket, user,allorders,contact  }, dispatch] = useStateValue()

  useEffect(() => {

    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
      if (!ADMIN) {
        history.push('/Admin')
      } 

    
      axios
      .get(`${BackServer}/data/getUserAllOrdersAdmin`)
      .then((res) => {
        dispatch({
          type: "ALLORDERS",
          payload: res.data.Allorder
        })
      })


      var values1 = []

      database.ref(`contact`).once('value', (snap) => {
        var fetchData1 = snap.val()
        for (let keys in fetchData1) {
            values1.push({ ...fetchData1[keys], key: keys })
        }



        dispatch({
            type: 'CONTACT',
            payload: values1,
        })


    })

   
  }, [allorders])

  const [state, setstate] = useState(0)
  const forbottomborder = (value) => {
    setstate(value)
  }
  const forhiddenBorder = () => {
    setstate(false)
  }

  
  const handleAuthenticaton = () => {
    var logout=localStorage.removeItem("ADMIN");
    if(logout){
      history.push('/Admin')

    }
  }

  const controlling = (route) => {
    history.push(`${route}`);
  };

  return (
 

    <NavbarWrapper style={{backgroundColor:"#9f7757"}}>
    <CompanyLogo />
    <NabarMenus className="navbar__content">
      <MenuItem onClick={() => controlling("/Landingpage")}>Landing Page</MenuItem>
      <MenuItem onClick={() => controlling("/adminBeds")}>Beds</MenuItem>
      <MenuItem onClick={() => controlling("/adminChairs")}>Chairs</MenuItem>
      <MenuItem onClick={() => controlling("/centertabels")}>Center Tables</MenuItem>
      <MenuItem onClick={() => controlling("/adminSofas")}>Sofa's</MenuItem>

      <MenuItem onClick={() => controlling("/adminDinnings")}>Dinning</MenuItem>
      <MenuItem onClick={() => controlling("/adminSwings")}>Swings</MenuItem>


     
    </NabarMenus>
    <NavBarRight>
      <MenuItem onClick={() => history.push("/allOrders")}>
        Orders
        <ItemCounter>{allorders === null ? 0 : allorders.length}</ItemCounter>
      </MenuItem>
      <MenuItem onClick={() => history.push("/Admincontact")}>
        Contacts
        <ItemCounter>{contact === null ? 0 : contact.length}</ItemCounter>
      </MenuItem>
      <MenuItem onClick={handleAuthenticaton}> Log Out</MenuItem>
   
    </NavBarRight>
  </NavbarWrapper>
  )
}

const NavbarWrapper = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 0.1px solid white;
  background-color: white;
  ${Media("xlscreens")} {
    height: 5.12vw;
  }
`;
const NabarMenus = styled.div`
  display: flex;
`;
const MenuItem = styled.div`
  font-size: 16px;
  font-family: "gilroysemibold";
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  cursor: pointer;
  color: white;

  &::after {
    position: absolute;
    content: "";
    height: 5px;
    width: 100%;
    background-color: ${colors.secondaryColor};
    bottom: 1px;
    width: 0px;
    transition: all 0.3s ease;
  }
  &:hover {
    &::after {  
      width: 100%;
    }
  }
  ${Media("xlscreens")} {
    font-size: 1.17vw;
    height: 5.12vw;
    padding: 0 1.46vw;
    &::after {
      height: 0.366vw;
    }
  }
`;
const NavBarRight = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  color: white;

  ${Media("xlscreens")} {
    right: 0.73vw;
  }
`;
const ItemCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 6px;
  background-color: ${colors.mainColor};
  color: white;
  font-size: 10px;
  height: 14px;
  width: 14px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${Media("xlscreens")} {
    top: 1.46vw;
    right: 0.43vw;
    font-size: 0.73vw;
    height: 1.02vw;
    width: 1.02vw;
    border-radius: 0.73vw;
  }
`;

export default AdminNavbar
