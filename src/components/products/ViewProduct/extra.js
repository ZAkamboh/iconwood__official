import React, { useEffect, useState } from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HeartRed from '../../../assets/landingPage/icons/heart.png'
import { useStateValue } from '../../StateProvider'
import { auth,database } from '../../../database'
import Nexticon from "../../../assets/icons/nexticon2.png";
import Previousicon from "../../../assets/icons/previousicon2.png";
import { Carousel } from "react-bootstrap";

import axios from 'axios';

import './viewproduct.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '5%',
    marginBottom: '5%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  detail: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    paddingLeft: '50px',
  },
  typography: {
    marginTop: '20px',
    fontWeight: 'bolder',
    textAlign: 'justify',
    borderBottom: '1px solid grey',
    paddingTop: '10px',
    paddingBottom: '20px',
  },
}))

const theme = createMuiTheme()

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}

function ViewProduct() {
  const [{ users }, dispatch] = useStateValue()

  const classes = useStyles()
  const location = useLocation()
  const history =useHistory()

  const [color, setcolor] = useState(1)
  const [viewProductItems, setviewProductItems] = useState('')

  
var ImagesArray=[]
  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
      //  ImagesArray.push(1)
  var items = location.state.item
  setnewbank([viewProductItems, ...items])
  }, [])

  const Selectcolor = (val) => {
    setcolor(val)
  }

  const _handleWishlistTrue = (item) => {
    var wishlistData = {
      title: item.title,
      desc: item.desc,
      rate: item.rate,
      url: item.url,
      wishlist: true,
      key: item.key,
    }

    var wishlistArray = JSON.parse(localStorage.getItem('wishlist'))
    var newArray = []
    if (wishlistArray === null) {
      newArray.push(wishlistData)
    } else {
      newArray = wishlistArray
      newArray.push(wishlistData)
    }
    localStorage.setItem('wishlist', JSON.stringify(newArray))

    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: newArray,
    })
  }

  const _handleWishlistFalse = (item) => {
    const wishlistData = {
      title: item.title,
      desc: item.desc,
      rate: item.rate,
      url: item.url,
      wishlist: false,
    }

    var wishlistItems = JSON.parse(localStorage.getItem('wishlist'))
    var newRemoveArray

    if (wishlistItems) {
      newRemoveArray = wishlistItems.filter((f, i) => f.key !== item.key)
    } else {
      newRemoveArray = wishlistItems
    }

    localStorage.setItem('wishlist', JSON.stringify(newRemoveArray))

    dispatch({
      type: 'REMOVE_FROM_BASKET',
      payload: newRemoveArray,
    })
  }

  const shopNow = () => {
    if(!users){
         history.push('/User_Login')
    }
    else{
      
      var orderData = {
        title: items.title,
        desc: items.desc,
        rate: items.rate,
        url: items.url,
        wishlist: items.wishlist,
        key: items.key,
        user:users
      }
      var key2 = Object.keys(users);
      var vals = users[key2[0]];
      database
      .ref(`orders/${vals.id}`)
      .push(orderData)
      .then((res) => {
        alert("order pushed")
        // axios.post(`https://proton-server.herokuapp.com/data/Sagaformdata`, data)
         axios.post(`http://localhost:8080/data/UserOrders`, orderData)
          .then(res => {
            alert("email send  our representative contact soon")

            axios.post(`http://localhost:8080/data/UserOrdersAdmin`, orderData)
            .then(res => {
              alert("email send to admin")
            })



          })
       
     


      })
  
    
    }

  }

  var wishlistTrueArray = JSON.parse(localStorage.getItem('wishlist'))
  const checkIfAdded = (key) => {
    const checked =
      wishlistTrueArray && wishlistTrueArray.filter((f) => f.key === key)
    if (checked && checked.length > 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
       
            <Carousel indicators={false} nextIcon={<div className="nextIcon" ><img  src={Nexticon} alt="error" height="20px" width="20px" /></div>} prevIcon={<img src={Previousicon} alt="error" height="30px" width="30px" />}  >
         
             
                    <Carousel.Item>
                        <img
                        className="product__Image"
                            src={items.url}
                            alt={"picture"}
                        />
                    </Carousel.Item>

                    <Carousel.Item>
                    <img
                    className="product__Image"
                        src={items.url}
                        alt={"picture"}
                    />
                </Carousel.Item>
              
        
        </Carousel>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.detail}>
            <ThemeProvider theme={theme}>
              <Typography className={classes.typography} variant="h4">
                {items.desc}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Typography className={classes.typography} variant="h5">
                {items.rate}
              </Typography>
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              {!users ? (
                <Typography className={classes.typography} variant="h6">
                  By clicking on the{' '}
                  <span style={{ color: '#000000' }}>Shop Now</span> button, A "LOGIN"
                  form will appear to get your information. Then after you have
                  Submitted your information, it will be delivered to us. We
                  will call you for further details about the product like :{' '}
                  <br /> (Sizes, Quantity, Wood, Texture etc.)
                </Typography>
              ) : (
                <Typography className={classes.typography} variant="h6">
                  By clicking on the{' '}
                  <span style={{ color: '#000000' }}>Shop Now</span> button, We
                  will call you for further details about the product like :{' '}
                  <br /> (Sizes, Quantity, Wood, Texture etc.)
                </Typography>
              )}
            </ThemeProvider>
          </div>
          <div className="Buttons">
            <button
              style={{
                backgroundColor: color === 1 ? 'black' : '',
                color: color === 1 ? 'white' : 'black',
              }}
              onMouseOver={() => Selectcolor(1)}
              onMouseLeave={() => Selectcolor(false)}
              onClick={shopNow}
              className="Buttons__shopNow"
            >
              <span>
                <ShoppingCartIcon
                  style={{ color: color === 1 ? 'white' : 'black' }}
                />
              </span>{' '}
              Shop Now
            </button>
            <button
              style={{
                backgroundColor: color === 2 ? 'black' : '',
                color: color === 2 ? 'white' : 'black',
              }}
              onMouseOver={() => Selectcolor(2)}
              onMouseLeave={() => Selectcolor(false)}
              className="Buttons__WishList"
            >
              <span>
                {(checkIfAdded(items.key) && (
                  <FavoriteBorderIcon
                    onClick={() => _handleWishlistFalse(items)}
                    style={{ color: 'red' }}
                  />
                )) || (
                  <FavoriteBorderIcon
                    onClick={() => _handleWishlistTrue(items)}
                  />
                )}
              </span>{' '}
              {(checkIfAdded(items.key) && (
                <span onClick={() => _handleWishlistFalse(items)}>
                  Remove From Wishlist
                </span>
              )) || (
                <span onClick={() => _handleWishlistTrue(items)}>
                  Add To Wishlist
                </span>
              )}
            </button>
          </div>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  )
}

export default ViewProduct
