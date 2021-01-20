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

function Section4products({ item }) {
  const [viewproduct, setviewproduct] = useState(false)
 
  const [section4Data, setsection4Data] = useState([])
  const classes = useStyles()

  useEffect(() => {
    var values = []
    database.ref(`Section4Data`).once('value', (snap) => {
      var data = snap.val()
      for (let keys in data) {
        values.push({ ...data[keys], key: keys })
      }
      setsection4Data([section4Data, ...values])
    })
  }, [])
const HandleSetViewProduct =()=>{

}

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper
            onMouseOver={()=>HandleSetViewProduct(true)}
            onMouseLeave={() => setviewproduct(false)}
            className={classes.paper}
          >
            <div>
              <div className="wishlistAndproductname">
                <div>{item.title}</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={item.url} width="100%" />
              <Fade bottom delay={1000}>
                <div>
                  <div className="title">{item.title}</div>
                  <div className="desc">
                   {item.desc}
                  </div>
                  {!viewproduct && <div className="rate">{item.rate}</div>}
                  {viewproduct && (
                    <div className="viewProductandWishList__Main">
                      <div> View Products</div>
                      <div style={{ color: 'grey' }}>Add To Wishlist</div>
                    </div>
                  )}
                </div>
              </Fade>
            </div>
          </Paper>
          
         
  
        </Grid>

       
  
      </Grid>
    </div>
  )
}

export default Section4products
