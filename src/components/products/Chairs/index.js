


import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Fade from 'react-reveal/Fade'
import { auth, storage, db, database } from '../../../database'
import Truncate from 'react-truncate';
import HeartRed from '../../../assets/landingPage/icons/heart.png'
import HeartWhite from '../../../assets/landingPage/icons/heartwhite.png'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { Link, useHistory } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import { useStateValue } from '../../StateProvider'
import { Server } from "../../Services"
// import './section4.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    width:"100%",
    paddingTop:"50px",
    paddingBottom:"130px",
    display:"flex",
    justifyContent:"center",
    backgroundColor: "#9f77574d",

  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    width:"100%",
    backgroundColor: "#eeede9",

  },
}))

function Chairs(props) {
  const [{ chairsData, wishlist,users }, dispatch] = useStateValue()
  const history = useHistory()

  const [viewproduct, setviewproduct] = useState(false)
  const [section4Data, setsection4Data] = useState([])
  const [wishlistWithInFunc, setwishlistWithInFunc] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
   

  }, [])

  useEffect(() => {
    var values = []
    database.ref(`chairs`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      values.sort((a, b) => a - b).reverse()

      dispatch({
        type: 'CHAIRS',
        payload: values,
      })
    })
  }, [chairsData])

  const _handleWishlistTrue = (item) => {
    var wishlistData = {
      title: item.title,
      desc: item.desc,
      rate: item.rate,
      url: item.url,
      url2:item.url2,
      wishlist: true,
      key: item.key,
      trackingid:item.trackingid,

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
      trackingid:item.trackingid,

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
      <Grid style={{width:"100%"}} container spacing={3}>
        {chairsData &&
          chairsData.map((item, i) => {
            return (
              <Grid key={item} item xs={12} sm={3}>
            
                <Paper id="item__Wrapper" className={classes.paper}>
                  <div style={{display:"flex",padding:"5px"}}>
                  <div  style={{paddingBottom:"5px"}}>
                        {(checkIfAdded(item.key) && (
                          <FavoriteBorderIcon
                            onClick={() => _handleWishlistFalse(item)}
                            style={{ color: 'red' }}
                          />
                        )) || (
                          <FavoriteBorderIcon
                            onClick={() => _handleWishlistTrue(item)}
                          />
                        )}
                      </div>

                      <div
                          onClick={() => window.open(`${Server}/ViewProduct?productId=${item.key}`, '_blank')}
                          className="visibility"
                        >
                          <Visibility style={{color:"red"}} />
                        </div>
                  </div>
             
                  <div >
                    <div className="wishlistAndproductname" style={{backgroundColor:""}}>
                 

                   
                    
                    </div>
                    <div  style={{height:"45vh", backgroundColor: "#9f77574d",}}>
                 

                 <img
                 style={{width:"100%",height:"45vh",objectFit:"cover"}}
                     onClick={() => window.open(`${Server}/ViewProduct?productId=${item.key}`, '_blank')}
                   src={item.url}
                 
                 />
                 
                 </div>
                 
                    <Fade bottom >
                      <div>
                        <div className="title MontserratSemiBold">{item.title}</div>
                        <Truncate className="desc MontserratRegular"  lines={1} ellipsis={<div  onClick={() => window.open(`${Server}/ViewProduct?productId=${item.key}`, '_blank')}  style={{color:"red",cursor:"pointer"}} className="desc MontserratSemiBold"   >Read more...</div>}>
                        {item.desc}...
                        </Truncate>
                        <div className="rate MontserratRegular">Rs : {item.rate}</div>
                        <div className="viewProductandWishList__Main">
                          <div className="MontserratSemiBold"
                        onClick={() => window.open(`${Server}/ViewProduct?productId=${item.key}`, '_blank')}
                        
                          >
                            {' '}
                            View Product
                          </div>
                          <div  style={{ color: 'green' }}>
                            {(checkIfAdded(item.key) && (
                         
                          <span  className="MontserratSemiBold" style={{fontSize:"12px"}}  onClick={() => _handleWishlistFalse(item)}>
                                Remove From Wishlist
                              </span>
                            )) || (
                              <span onClick={() => _handleWishlistTrue(item)}>
                                Add To Wishlist
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Fade>
                  </div>
                </Paper>
              </Grid>
            )
          })}
      </Grid>
    </div>
  )
}

export default Chairs
