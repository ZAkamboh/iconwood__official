import React from 'react';
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
import clsx from 'clsx';
import { Link, useHistory, useLocation } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';

import { useStateValue } from '../../StateProvider'

import './mobilenavbar.css'
const useStyles = makeStyles({
  root: {
    width: "100%",
    position:"fixed",
    bottom:"0%",
  },
  list: {
    width: 380,
  },
  fullList: {
    width: "auto",
  },
});

export default function LabelBottomNavigation() {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [value, setValue] = React.useState('recents');
  const [{ wishlist,Userorders,users,allorders }, dispatch] = useStateValue()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signoutMethod = () =>{
    localStorage.removeItem("users")
  
    dispatch({
      type: 'SET_USER',
      payload: null,
    })
    
    history.push('/')
    
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText onClick={()=>alert(text)} primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    
    <BottomNavigation showLabels={true} value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction onClick={() => history.push('/')}  style={{color:value === "Home" ? "red" :"black"}}  label="Home" value="Home" icon={<HomeIcon />} />

            {users === null ? (
                    <BottomNavigationAction onClick={() => history.push('/User_Login')}  style={{color:value === "Login" ? "red" :"black"}}  label="Login" value="Login" icon={<PersonAddIcon />} />

            ) : (
              
                <BottomNavigationAction onClick={signoutMethod}  style={{color:value === "Login" ? "red" :"black"}}  label="Sign Out" value="Login" icon={<PersonAddIcon />} />

            )}
          {users !== null && 
      <BottomNavigationAction onClick={() => history.push('/User_Orders')} style={{color:value === "Shops" ? "red" :"black"}}  label={`Orders ${Userorders === null ? 0 :  Userorders.length}`} value="Shops" icon={<ShopIcon />} />}
      <BottomNavigationAction onClick={() => history.push('/wishlist')}  style={{color:value === "Wishlist" ? "red" :"black"}}  label={`Wishlist ${wishlist === null ? 0 : wishlist.length}`} value="Wishlist" icon={<FavoriteIcon />} />
      <BottomNavigationAction onClick={toggleDrawer("right", true)}  style={{color:value === "Menu" ? "red" :"black"}}  label="Menu" value="Menu" icon={<MenuIcon />} />
      <div>

      {/* <BottomNavigationAction onClick={toggleDrawer("left", true)}  style={{color:value === "Menu" ? "red" :"black"}}  label="Menu" value="Menu" icon={<MenuIcon />} /> */}

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