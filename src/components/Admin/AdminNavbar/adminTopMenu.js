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
import { auth, database } from '../../../database'
import axios from 'axios'
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
import styled from "styled-components";
import CompanyLogo from "../../../shared-components/company-logo";
import { colors, Media } from "../../../shared-components";
import { useStateValue } from '../../StateProvider'
import { BackServer } from "../../Services"

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

export default function Admintopmenu() {







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
    const [{ wishlist, Userorders, users, allorders, contact }, dispatch] = useStateValue()
    const [expand1Icon, setExpand1Icon] = useState(false);
    const [expand2Icon, setExpand2Icon] = useState(false);
    const [value2, setValue2] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleAuthenticaton = () => {

        var logout = localStorage.removeItem("ADMIN");


        if (logout) {


            history.push('/Admin')

        }
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












    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <List style={{ padding: 10 }}>


                <ListItem button style={{ backgroundColor: '#9f7757', height: 55 }}>
                    <ListItemText style={{ color: "#ffffff" }}><span style={{ fontWeight: "bold", fontSize: "15px" }}><BuildIcon style={{ fontSize: "14px" }} /> Icon Wood</span></ListItemText>
                    <ListItemIcon ><CloseIcon onClick={() => handleClick(false, null)} style={{ fontSize: 20, color: "#ffffff", marginLeft: "39px", fontSize: "17px" }} /></ListItemIcon>
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
                            <div onClick={() => handleClick(false, "/Landingpage")} className="productItems">Landing Page</div>
                            <div onClick={() => handleClick(false, "/adminChairs")} className="productItems">chairs</div>
                            <div onClick={() => handleClick(false, "/adminSofas")} className="productItems">sofas</div>
                            <div onClick={() => handleClick(false, "/adminDinnings")} className="productItems">dininings</div>
                            <div onClick={() => handleClick(false, "/centertabels")} className="productItems">center tables</div>
                            <div onClick={() => handleClick(false, "/adminSwings")} className="productItems">swings</div>
                            <div onClick={() => handleClick(false, "/adminBeds")} className="productItems">beds</div>

                        </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                <Divider />

                <ListItem onClick={() => handleClick(false, "/allOrders")} >
                    <ListItemText>

                        <MenuItem style={{ color: "grey" }} onClick={() => history.push("/allOrders")}>
                            Orders
        <ItemCounter>{allorders === null ? 0 : allorders.length}</ItemCounter>
                        </MenuItem>


                    </ListItemText>
                </ListItem>




                <ListItem onClick={() => handleClick(false, "/Admincontact")} >
                    <ListItemText>

                        <MenuItem style={{ color: "grey" }} onClick={() => history.push("/Admincontact")}>
                            Contacts
        <ItemCounter>{contact === null ? 0 : contact.length}</ItemCounter>
                        </MenuItem>

                    </ListItemText>
                </ListItem>



                <ListItem onClick={handleAuthenticaton} >
                    <ListItemText onClick={handleAuthenticaton}>

                    Log Out

                    </ListItemText>
                </ListItem>

                            

            </List>

            <div onClick={() => handleClick(false, "/AdminHome")} style={{ display: "flex", justifyContent: "center", paddingBottom: "50px" }}>
                <img src={logo} width="25%" />
            </div>


        </div>
    );

    return (


        <div style={{ width: "100%", height: "70px", backgroundColor: "#9f7757" }}>

            <NavBarRight>
                <MenuItem id="MontserratRegular" style={{ color: "black" }}>
                    <MenuIcon onClick={toggleDrawer("right", true)} />
                </MenuItem>
            </NavBarRight>



            <NabarMenus style={{ paddingLeft: "20px", paddingTop: "10px" }} className="navbar__content">
                <img onClick={() => history.push("/AdminHome")} src={logo} width="15%" />

            </NabarMenus>

            <div>


                {['right'].map((anchor) => (
                    <React.Fragment key={anchor}>

                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>



        </div>
    );
}

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
  color:white;
  &::after {
    position: absolute;
    content: "";
    height: 5px;
    width: 100%;
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