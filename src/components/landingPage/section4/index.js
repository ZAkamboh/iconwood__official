import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Chair from '../../../assets/landingPage/section4/chair.jpg'
import Sitetable from '../../../assets/landingPage/section4/sitetable.jpg'
import Sofa from '../../../assets/landingPage/section4/sofa.jpg'
import Fade from 'react-reveal/Fade'

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

function LandingSection4() {
  const [viewproduct, setviewproduct] = useState(false)
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper
            onMouseOver={() => setviewproduct(true)}
            onMouseLeave={() => setviewproduct(false)}
            className={classes.paper}
          >
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Chair} width="100%" />
              <Fade bottom delay={1000}>
              <div>
              <div className="title">BEDROOM</div>
              <div className="desc">
                Bed with two site tables and dressing
              </div>
              {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
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
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Sitetable} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Sofa} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Chair} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Sitetable} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Sofa} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Chair} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <div className="wishlistAndproductname">
                <div>Bed</div>
                <div className="wishlistIcon">
                  <img src={HeartWhite} height="35%" width="35%" />
                </div>
              </div>
              <img src={Sitetable} width="100%" />
              <div>
                <div className="title">BEDROOM</div>
                <div className="desc">
                  Bed with two site tables and dressing
                </div>
                {!viewproduct && <div className="rate">£ 84.00 £ 54.00</div>}
                {viewproduct && (
                  <div className="viewProductandWishList__Main">
                    <div> View Products</div>
                    <div style={{ color: 'grey' }}>Add To Wishlist</div>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingSection4
