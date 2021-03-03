import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Chair from '../../../assets/landingPage/section4/chair.jpg'
import Sitetable from '../../../assets/landingPage/section4/sitetable.jpg'
import Sofa from '../../../assets/landingPage/section4/sofa.jpg'
import Fade from 'react-reveal/Fade'
import { auth, storage, db, database } from '../../../database'

import HeartRed from '../../../assets/landingPage/icons/heart.png'
import HeartWhite from '../../../assets/landingPage/icons/heartwhite.png'

import Section1B from '../../../assets/landingPage/section2/section2b.jpg'
import Section1C from '../../../assets/landingPage/section2/section2c.jpg'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { Link, useHistory } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import { useStateValue } from '../../StateProvider'
import { Server } from "../../Services"
import './section4.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '2%',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

function LandingSection4(props) {
  const [{ section4Items, wishlist,users }, dispatch] = useStateValue()
  const history = useHistory()

  const [viewproduct, setviewproduct] = useState(false)
  const [section4Data, setsection4Data] = useState([])
  const [wishlistWithInFunc, setwishlistWithInFunc] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    var values = []
    database.ref(`Section4Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }

      dispatch({
        type: 'SECTION4_DATA',
        payload: values,
      })
    })
  }, [])

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
      <Grid container spacing={3}>
        {section4Items &&
          section4Items.map((item, i) => {
            return (
              <Grid key={item} item xs={3}>
                <Paper id="item__Wrapper" className={classes.paper}>
                  <div>
                    <div className="wishlistAndproductname">
                      <div>{item.title}</div>

                      <div className="wishlistIcon">
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
                          <Visibility />
                        </div>
                    </div>
                    <img
                        onClick={() => window.open(`${Server}/ViewProduct?productId=${item.key}`, '_blank')}
                      src={item.url}
                      width="100%"
                    />
                    <Fade bottom delay={1000}>
                      <div>
                        <div className="title">{item.title}</div>
                        <div className="desc">{item.desc}</div>
                        <div className="rate">{item.rate}</div>
                        <div className="viewProductandWishList__Main">
                          <div
                            onClick={() =>
                              history.push({ pathname: `${item.title}` })
                            }
                          >
                            {' '}
                            View Products
                          </div>
                          <div style={{ color: 'grey' }}>
                            {(checkIfAdded(item.key) && (
                              <span onClick={() => _handleWishlistFalse(item)}>
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

export default LandingSection4
