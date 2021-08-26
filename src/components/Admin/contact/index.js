




import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStateValue } from '../../StateProvider'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { auth, storage, db, database } from '../../../database'

import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function Contact () {
  const classes = useStyles();
const history = useHistory()

  const [{ contact }, dispatch] = useStateValue()





  useEffect(() => {
    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
    if (!ADMIN) {
      history.push('/Admin')
    }


    axios
      .get(`https://iconwood.herokuapp.com/data/getUserAllOrdersAdmin`)
      .then((res) => {

       var allorders= res.data.Allorder.sort((a, b) => a - b).reverse()
        dispatch({
          type: "ALLORDERS",
          payload: allorders
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




  }, [contact])


  return (
    <div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Message</TableCell>
              


            </TableRow>
          </TableHead>
          <TableBody>
            {contact && contact.map((contact, i) => (
              <TableRow  key={i} style={{ cursor: "pointer" }}>
               
                <TableCell component="th" scope="row">
                  {contact.email}
                </TableCell>
                <TableCell align="right">{contact.phone}</TableCell>

                <TableCell align="right">{contact.message}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}


















