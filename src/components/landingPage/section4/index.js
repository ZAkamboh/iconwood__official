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
import { Link, useHistory } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import { useStateValue } from '../../StateProvider'

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
  const [{ section4Items }, dispatch] = useStateValue()
  const history = useHistory()

  const [viewproduct, setviewproduct] = useState(false)
  const [wishlist, setwishlist] = useState(false)

  const [section4Data, setsection4Data] = useState([])
  const classes = useStyles()

  useEffect(() => {
    var values = []
    database.ref(`Section4Data`).once('value', (snap) => {
      var fetchData = snap.val()
      for (let keys in fetchData) {
        values.push({ ...fetchData[keys], key: keys })
      }
      // setsection4Data([section4Data, ...values])

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
      wishlist: true,
      key:item.key
    }

    var wishlistArray = JSON.parse(localStorage.getItem("wishlist"));
    var newArray = [];
    if (wishlistArray === null) {
      newArray.push(wishlistData);
    }
    else {
      newArray = wishlistArray ;
      newArray.push(wishlistData);
    }
    localStorage.setItem("wishlist", JSON.stringify(newArray))
      dispatch({
      type: "ADD_TO_WISHLIST",
      payload: newArray
    })


    database
      .ref(`Section4Data/${item.key}`)
      .set(wishlistData)
      .then(() => {
        const UpdatedValues = []
        database.ref(`Section4Data`).once('value', (snap) => {
          const fetchUpdatedData = snap.val()
          for (let keys in fetchUpdatedData) {
            UpdatedValues.push({ ...fetchUpdatedData[keys], key: keys })
          }

          dispatch({
            type: 'SECTION4_DATA',
            payload: UpdatedValues,
          })
        })
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




    var wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
      var newRemoveArray ;

      if (wishlistItems) {
        newRemoveArray = wishlistItems.filter((f, i) => f.key !== item.key );
      }
      else {
        newRemoveArray = wishlistItems;
      }

      
      localStorage.setItem("wishlist",JSON.stringify(newRemoveArray))




     dispatch({
       type: 'REMOVE_FROM_BASKET',
       payload: newRemoveArray,
    })







    database
      .ref(`Section4Data/${item.key}`)
      .set(wishlistData)
      .then(() => {
        const UpdatedValues = []
        database.ref(`Section4Data`).once('value', (snap) => {
          const fetchUpdatedData = snap.val()
          for (let keys in fetchUpdatedData) {
            UpdatedValues.push({ ...fetchUpdatedData[keys], key: keys })
          }

          dispatch({
            type: 'SECTION4_DATA',
            payload: UpdatedValues,
          })
        })
      })
  }


  

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {section4Items.map((item, i) => {
          return (
            <Grid key={item} item xs={3}>
              <Paper
                onMouseOver={() => setviewproduct(true)}
                onMouseLeave={() => setviewproduct(false)}
                className={classes.paper}
              >
                <div>
                  <div className="wishlistAndproductname">
                    <div>{item.title}</div>
                    <div className="wishlistIcon">
                      {item.wishlist === false ? (
                        <img
                          onClick={() => _handleWishlistTrue(item)}
                          src={HeartWhite}
                          height="35%"
                          width="35%"
                        />
                      ) : (
                        <img
                          onClick={() => _handleWishlistFalse(item)}
                          src={HeartRed}
                          height="20%"
                          width="20%"
                        />
                      )}
                    </div>
                    {viewproduct && <div onClick={()=>history.push({pathname:`/ViewProduct`,state:{item:item}})} className="visibility"><Visibility/></div>}

                  </div>
                  <img onClick={()=>history.push({pathname:`/ViewProduct`,state:{item:item}})} src={item.url} width="100%" />
                  <Fade bottom delay={1000}>
                    <div>
                      <div className="title">{item.title}</div>
                      <div className="desc">{item.desc}</div>
                      {!viewproduct && <div className="rate">{item.rate}</div>}
                      {viewproduct === true && (
                        <div className="viewProductandWishList__Main">
                          <div onClick={()=>history.push({pathname:`${item.title}`})} > View Products</div>
                          <div style={{ color: 'grey' }}>
                            {item.wishlist === false ? (
                              <span onClick={() => _handleWishlistTrue(item)}>
                                Add To Wishlist
                              </span>
                            ) : (
                              <span onClick={() => _handleWishlistFalse(item)}>
                                Remove From Wishlist
                              </span>
                            )}
                          </div>
                        </div>
                      )}
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
