import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuIcon from '@material-ui/icons/Menu';
import ShopIcon from '@material-ui/icons/Shop';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import logo from "../../../assets/icons/logo.png"

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import BuildIcon from '@material-ui/icons/Build';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import { BackServer } from "../../Services"

import { useStateValue } from '../../StateProvider'

import './mobilenavbar.css'
const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0%",
  },
  list: {
    width: 340,
  },
  fullList: {
    width: "auto",
  },
});

export default function LabelBottomNavigation() {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [value, setValue] = React.useState('Home');
  const [{ wishlist, Userorders, users, allorders }, dispatch] = useStateValue()
  const [expand1Icon, setExpand1Icon] = useState(false);
  const [expand2Icon, setExpand2Icon] = useState(false);
  const [value2, setValue2] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signoutMethod = () => {
    localStorage.removeItem("users")

    dispatch({
      type: 'SET_USER',
      payload: null,
    })

    history.push('/')

  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (open) {
      setDrawerOpen(true);
    }

    else {
      setDrawerOpen(false);
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = (value, links, fff) => {
    setDrawerOpen(value);
    setExpand1Icon(fff)
    setState({ ...state, right: value });
    if (links) {
      history.push(links)

    }


  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

    >
      <List style={{ padding: 10 }}>


        <ListItem button style={{ backgroundColor: '#9f7757', height: 55 }}>
          <ListItemText style={{ color: "#ffffff" }}><span style={{ fontWeight: "bold", fontSize: "15px" }}><BuildIcon style={{ fontSize: "14px" }} /> Icon Wood</span></ListItemText>
          <ListItemIcon ><CloseIcon onClick={() => handleClick(false, null)} style={{ fontSize: 20, color: "#ffffff", marginLeft: "39px", fontSize: "17px" }} /></ListItemIcon>
        </ListItem>
        <ListItem onClick={() => window.open('https://goo.gl/maps/kWMdRfwtdG7wwaqAA', '_blank')} button style={{ border: value2 === 1 && "2px solid #9f7757", marginTop: 6, height: 55 }}>
          <ListItemText style={{ color: "#9f7757" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Find Location</span></ListItemText>
          <ListItemIcon><ArrowForwardIosIcon style={{ fontSize: 20, marginLeft: "39px", fontSize: "17px" }} /></ListItemIcon>
        </ListItem>
        <ExpansionPanel style={{ border: value2 === 2 && "2px solid #9f7757", marginTop: 10, boxShadow: "none" }} id="DrawerShoppingToolsMenu" onChange={(event, expanded) => { setExpand1Icon(expanded) }}>
          <ExpansionPanelSummary
            expandIcon={expand1Icon ? <RemoveIcon style={{ fontSize: 20, color: expand1Icon ? "#9f7757" : "" }} /> : <AddIcon style={{ fontSize: 20 }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <ListItemText><span style={{ fontWeight: "bold", fontSize: "12px", color: expand1Icon ? "#9f7757" : "" }}>Products</span></ListItemText>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>


            <div>

              <div onClick={() => handleClick(false, "/chairs")} className="productItems">Chairs</div>
              <div onClick={() => handleClick(false, "/sofas")} className="productItems">Sofas</div>
              <div onClick={() => handleClick(false, "/dinnings")} className="productItems">Dininings</div>
              <div onClick={() => handleClick(false, "/centerTables")} className="productItems">Tables</div>
              <div onClick={() => handleClick(false, "/swings")} className="productItems">Swings</div>
              <div onClick={() => handleClick(false, "/beds")} className="productItems">Beds</div>

            </div>


          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
        <ListItem onClick={() => handleClick(false, "/contact", 3)} button id="DrawerDodgeGarageMenu" style={{ marginTop: 10, border: value2 === 3 && "2px solid #9f7757" }}>
          <ListItemText><span style={{ fontWeight: "bold", fontSize: "12px" }}>Contact Us</span></ListItemText>
          <ListItemIcon><ArrowForwardIosIcon style={{ fontSize: 20, marginLeft: "39px", fontSize: "17px" }} /></ListItemIcon>
        </ListItem>

        <Divider />
        <ListItem onClick={() => handleClick(false, "/about", 4)} button style={{ marginTop: 10, border: value2 === 4 && "2px solid #9f7757" }}>
          <ListItemText><span style={{ fontWeight: "bold", fontSize: "12px" }}>About Us</span></ListItemText>
          <ListItemIcon><ArrowForwardIosIcon style={{ fontSize: 20, marginLeft: "39px", fontSize: "17px" }} /></ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem onClick={() => handleClick(false, "/")} >
          <ListItemText><span style={{ fontWeight: "bold", fontSize: "12px" }}>iconwood</span><span style={{ fontWeight: "bold", fontSize: "6px" }}> By 'Al Madina Furniture'</span></ListItemText>
        </ListItem>
      </List>

      <div onClick={() => handleClick(false, "/")} style={{ display: "flex", justifyContent: "center", paddingBottom: "50px" }}>
        <img src={logo} width="25%" />
      </div>
    </div>
  );

  return (

    <BottomNavigation id="mobileRoot" showLabels={true} value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction id="mobileHome" onClick={() => history.push('/')} style={{ color: location.pathname === "/" ? "red" : "black", fontSize: "5px" }} label="Home" value="Home" icon={<HomeIcon />} />

      {users === null ? (
        <BottomNavigationAction onClick={() => history.push('/User_Login')} style={{ color: value === "Login" ? "black" : "black" }} label="Login" value="Login" icon={<PersonAddIcon />} />

      ) : (

        <BottomNavigationAction onClick={signoutMethod} style={{ color: value === "Login" ? "black" : "black" }} label="Sign Out" value="Login" icon={<PersonAddIcon />} />

      )}
      
      {users !== null &&
        <BottomNavigationAction onClick={() => history.push('/User_Orders')} style={{ color: value === "Shops" ? "red" : "black" }} label={`Orders ${Userorders === null ? 0 : Userorders.length}`} value="Shops" icon={<ShopIcon />} />}
      <BottomNavigationAction onClick={() => history.push('/wishlist')} style={{ color: location.pathname === "/wishlist"  ? "red" : "black", fontSize: "5px" }} label={`Wishlist ${wishlist === null ? 0 : wishlist.length}`} value="Wishlist" icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={toggleDrawer("right", true)} style={{ color: value === "Menu" ? "black" : "black" }} label="Menu" value="Menu" icon={<MenuIcon />} />
      <div>


        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>

            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </BottomNavigation>


  );
}