import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HeartRed from '../../assets/landingPage/icons/heart.png'
import { useStateValue } from '../StateProvider'
import ClipLoader from "react-spinners/ClipLoader";
import { BackServer } from "../../components/Services"

import { auth, database } from '../../database'
import Nexticon from '../../assets/icons/nexticon2.png'
import Previousicon from '../../assets/icons/previousicon2.png'

import { Carousel } from 'react-bootstrap'

import axios from 'axios'

import './wishList.css'

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    overflow: 'hidden',
    paddingTop: "1%",
    marginTop: "2%",
    paddingBottom: "100px",
    backgroundColor: "#eeede9",
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
    marginTop: "10px",
    fontFamily: "italic"
  },
  typography: {
    marginTop: '20px',
    fontWeight: 'bolder',
    textAlign: 'justify',
    borderBottom: '1px solid grey',
    paddingTop: '10px',
    paddingBottom: '20px',
  },
  typography2: {
    marginTop: '20px',
    fontWeight: 'bolder',
    textAlign: 'justify',
    borderBottom: '1px solid grey',
    paddingTop: '10px',
    paddingBottom: '20px',
    wordSpacing: "-2px",
    fontSize: "13px",
    color: '#e36c02',

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

function Wishlist() {
  const [{ users, wishlist, Userorders,allUsersData }, dispatch] = useStateValue()
  const [section4Items, setsection4Items] = useState([])
  const [processing, setProcessing] = useState(false)
  const [succeeded, setSucceeded] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  const [color, setcolor] = useState(1)
  var initialValue = []

  var ImagesArray = []
  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0


  }, [])


  useEffect(() => {


    var usersfromlocalstorage = JSON.parse(
      localStorage.getItem('users'),
    )

    if (usersfromlocalstorage) {

      axios
        .post(`${BackServer}/data/getUserOrders/${usersfromlocalstorage._id}`)
        .then((res) => {
          dispatch({
            type: "SHOPNOW",
            payload: res.data.order
          })
        })

    }

  }, [Userorders])



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
      trackingid: item.trackingid,
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
      trackingid: item.trackingid,
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

  const shopNow = (i) => {
    if (!users) {

      history.push({
        pathname: `/User_Login`,
      })
    }

    else {

      setProcessing(true)
      var orderData = {
        title: i.title,
        desc: i.desc,
        rate: i.rate,
        url: i.url,
        wishlist: i.wishlist,
        key: i.key,
        userId: users._id,
        username: users.name,
        useremail: users.email,
        usercontact: users.contact,
        trackingid: Math.floor(Math.random() * 100000000000000),
        status: "Pending",
        orderDate: new Date().toLocaleDateString('de-DE'),
        key: i.key,

      }

      axios
        .post(`${BackServer}/data/UserOrders`, orderData)
        .then((res) => {

          alert("Order Succussfully Placed")
          setProcessing(false)

          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0

          axios
            .post(`${BackServer}/data/UserOrdersAdmin`, orderData)
            .then((res) => {
              alert('We will Contact You Soon..Thanku')

            })
          const wishlistRemoveData = {
            title: i.title,
            desc: i.desc,
            rate: i.rate,
            url: i.url,
            wishlist: false,
            key: i.key,
            trackingid: i.trackingid,
          }

          var wishlistItems2 = JSON.parse(localStorage.getItem('wishlist'))
          var newRemoveArray2

          if (wishlistItems2) {
            newRemoveArray2 = wishlistItems2.filter((f, index) => f.key !== i.key)
          } else {
            newRemoveArray2 = wishlistItems2
          }

          localStorage.setItem('wishlist', JSON.stringify(newRemoveArray2))

          dispatch({
            type: 'REMOVE_FROM_BASKET',
            payload: newRemoveArray2,
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

  var p = window.location.search;
  var productid = p.split("=");
  var productId = productid[1]



  return (
    <div>

      {wishlist && wishlist.length === 0 || !wishlist ? <div id="MontserratSemiBold" style={{ height: "650px", backgroundColor: "#eeede9", color: "grey", justifyContent: "center", alignItems: "center", display: "flex" }}><h3>No Item In Wishlist</h3></div> : wishlist && wishlist.map((items, i) => {
        return (
          <div id="wishlistMain" className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={12} sm={5}>

                <Carousel
                  indicators={false}
                  nextIcon={
                    false
                  }
                  prevIcon={
                    false
                  }
                >
                  <Carousel.Item>
                    <img
                      className="product__Image"
                      src={items.url}
                      alt={'picture'}
                    />
                  </Carousel.Item>

                  {items.url2 &&
                    <Carousel.Item>
                      <img
                        className="product__Image"
                        src={items.url}
                        alt={'picture'}
                      />
                    </Carousel.Item>
                  }

                  {items.url3 &&
                    <Carousel.Item>
                      <img
                        className="product__Image"
                        src={items.url}
                        alt={'picture'}
                      />
                    </Carousel.Item>
                  }

                </Carousel>

              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={12} sm={4}>
                <div id="detail" className={classes.detail}>
                  <ThemeProvider theme={theme}>
                    <div id="MontserratSemiBold" className={classes.typography2} variant="h3">
                      {items.desc}
                    </div>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Typography id="MontserratSemiBold" className={classes.typography} variant="h5">
                      Rs : {items.rate}
                    </Typography>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    {!users ? (
                      <Typography id="MontserratRegular" style={{ fontSize: "13px" }} className={classes.typography} variant="h6">
                        By clicking on the{' '}
                        <span style={{ color: '#000000' }}>Shop Now</span> button, A
                  "LOGIN" form will appear to get your information. Then after
                  you have Submitted your information, it will be delivered to
                  us. We will call you for further details about the product
                  like : <br /> (Sizes, Quantity, Wood, Texture etc.)
                      </Typography>
                    ) : (
                      <Typography id="MontserratRegular" style={{ fontSize: "13px" }} className={classes.typography} variant="h6">
                        By clicking on the{' '}
                        <span style={{ color: '#000000' }}>Shop Now</span> button,
                  We will call you for further details about the product like
                  : <br /> (Sizes, Quantity, Wood, Texture etc.)
                      </Typography>
                    )}
                  </ThemeProvider>
                </div>
                <div className="Buttons">
                  <button
                    disabled={processing && disabled}
                    style={{
                      backgroundColor: color === 1 ? 'black' : '',
                      color: color === 1 ? 'white' : 'black',
                    }}
                    onMouseOver={() => Selectcolor(1)}
                    onMouseLeave={() => Selectcolor(false)}
                    onClick={() => shopNow(items)}
                    className="Buttons__shopNow"
                  >

                    {!processing ?

                      <span>
                        <ShoppingCartIcon
                          style={{ color: color === 1 ? 'white' : 'black' }}
                        />
                      Shop Now
                    </span>

                      :

                      <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>      <ClipLoader color={"red"}
                      />
                      </span>


                    }

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
      })}


    </div>
  )
}

export default Wishlist
