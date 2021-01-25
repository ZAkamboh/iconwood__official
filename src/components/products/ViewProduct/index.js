import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HeartRed from '../../../assets/landingPage/icons/heart.png'

import './viewproduct.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    marginTop: '2%',
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
  const classes = useStyles()
  const location = useLocation()
  const items = location.state.item
  const users = location.state.users

  const [color, setcolor] = useState(1)

  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }, [])

  const Selectcolor = (val) => {
    setcolor(val)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <img src={items.url} width="70%" />
          </Paper>
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
              <Typography className={classes.typography} variant="h6">
                By clicking on the{' '}
                <span style={{ color: '#000000' }}>Shop Now</span> button, A
                form will appear to get your information. Then after you have
                Submitted your information, it will be delivered to us. We will
                call you for further details about the product like : <br />{' '}
                (Sizes, Quantity, Wood, Texture etc.)
              </Typography>
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
                {items.wishlist === false ? (
                  <FavoriteBorderIcon
                    style={{ color: color === 2 ? 'white' : 'black' }}
                  />
                ) : (
                    <FavoriteBorderIcon
                    style={{ color: "red" }}
                  />
                )}
              </span>{' '}
              {items.wishlist === false ? (
                <span>Add To Wishlist</span>
              ) : (
                <span>Remove From Wishlist</span>
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
